import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// 1. Read env variables
const envPath = path.resolve('.env');
console.log("Loading environment from:", envPath);
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

// Allow overriding via command line or env variables
const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Parse command line arguments
const args = process.argv.slice(2);
let serviceKeyArg = '';
let emailArg = '';
let passwordArg = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--service-key' && args[i + 1]) {
    serviceKeyArg = args[i + 1];
  } else if (args[i] === '--email' && args[i + 1]) {
    emailArg = args[i + 1];
  } else if (args[i] === '--password' && args[i + 1]) {
    passwordArg = args[i + 1];
  }
}

if (serviceKeyArg) {
  supabaseKey = serviceKeyArg;
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.");
  console.log("\nUsage:\n  node src/utils/seedSupabase.js --service-key <YOUR_SERVICE_ROLE_KEY>\nOR\n  node src/utils/seedSupabase.js --email <ADMIN_EMAIL> --password <ADMIN_PASSWORD>\n");
  process.exit(1);
}

console.log("Supabase URL:", supabaseUrl);
// Use the service_role key if available for bypassing RLS
const isServiceRole = supabaseKey.includes('service_role') || serviceKeyArg || process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log("Using key type:", isServiceRole ? "Service Role (RLS Bypass)" : "Publishable/Anon Key");

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const cleanKey = (name) => name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

async function uploadFolderImages(dirPath, bucketFolder) {
  console.log(`\n--- Uploading images from ${dirPath} to bucket folder: ${bucketFolder} ---`);
  const mapping = {};
  
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory ${dirPath} does not exist. Skipping.`);
    return mapping;
  }

  const files = fs.readdirSync(dirPath);

  // Try creating the bucket just in case
  try {
    await supabase.storage.createBucket('connect_assets', { public: true });
  } catch (e) {
    // Ignore if bucket already exists
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
      continue;
    }

    const filePath = path.join(dirPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const destPath = `${bucketFolder}/${file}`;

    let contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    const baseName = path.basename(file, ext);
    const key = cleanKey(baseName);

    console.log(`Uploading ${file} ...`);
    const { error } = await supabase.storage
      .from('connect_assets')
      .upload(destPath, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.warn(`Warning: Failed to upload ${file} (${error.message}). Using local key.`);
      mapping[key] = baseName;
      continue;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('connect_assets')
      .getPublicUrl(destPath);

    mapping[key] = publicUrl;
  }

  return mapping;
}

async function run() {
  try {
    // 2. Perform authentication if email and password are provided
    if (emailArg && passwordArg) {
      console.log(`\n--- Authenticating as admin: ${emailArg} ---`);
      const { error } = await supabase.auth.signInWithPassword({
        email: emailArg,
        password: passwordArg
      });
      if (error) {
        console.error("Authentication failed:", error.message);
        process.exit(1);
      }
      console.log("Authenticated successfully!");
    }

    // 3. Upload assets and build mappings
    const foundersMap = await uploadFolderImages('src/assets/images/founders', 'founders');
    const internsMap = await uploadFolderImages('src/assets/images/interns', 'interns');
    const eventsMap = await uploadFolderImages('src/assets/images/Events', 'events');
    const usMap = await uploadFolderImages('src/assets/images/Us', 'us');

    const allImagesMap = {
      ...foundersMap,
      ...internsMap,
      ...eventsMap,
      ...usMap
    };

    console.log("\nUploaded/mapped images successfully. Mapped", Object.keys(allImagesMap).length, "assets.");

    // Helper to resolve an image variable name
    const getImageUrl = (varName) => {
      if (!varName) return null;
      const key = cleanKey(varName);
      return allImagesMap[key] || varName;
    };

    // 4. Clear existing table rows to avoid duplicates
    console.log("\n--- Cleaning existing database records ---");
    await supabase.from('gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('teams').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 5. Seed gallery table
    console.log("\n--- Seeding gallery table ---");
    const usImages = [
      'BootCamp', 'inFront', 'Image3', 'Image4', 'Image5', 'Image6', 'Image7'
    ];
    
    const galleryRows = [];
    for (const varName of usImages) {
      const url = getImageUrl(varName);
      if (url) {
        galleryRows.push({ url, type: 'about' });
        galleryRows.push({ url, type: 'why-we-exist' });
      }
    }

    if (galleryRows.length > 0) {
      const { error } = await supabase.from('gallery').insert(galleryRows);
      if (error) throw error;
      console.log(`Inserted ${galleryRows.length} gallery records.`);
    }

    // 6. Parse and Seed teams table
    console.log("\n--- Seeding teams table ---");
    let teamsContent = fs.readFileSync('src/const/data/Teams.js', 'utf-8');
    teamsContent = teamsContent.replace(/import\s+[\s\S]*?\s+from\s+['"].*?['"]/g, '');
    teamsContent = teamsContent.replace(/export\s+default/g, 'const exported =');
    
    const imageVars = [
      'Afeef', 'Aseel', 'Nahyan', 'Salman', 'Jasim', 'Hasil', 'Dilshad', 'ShanaShirin', 'Hasna',
      'Amjad', 'Athif', 'Gayathri', 'Hanana', 'Jannah', 'Marva', 'Rafeeda', 'Rashid', 'Saleel',
      'Shifna', 'Sibna', 'Sunain', 'Dayyan', 'Fabin', 'Rizwan', 'Shahbana', 'Shamil', 'Nasrin',
      'Muhsina', 'Fawar', 'Nourin', 'Salmanjnr', 'Anshif', 'Mushrifa', 'Fahmiya', 'Murshida',
      'Musfira', 'Swalih', 'Haniya', 'Fadil', 'Sinan'
    ];
    const declarations = imageVars.map(v => `const ${v} = "${v}";`).join('\n') + '\n';
    
    const evalCode = `
      ${declarations}
      ${teamsContent}
      ; (function() { return { FoundersData, InternsData }; })()
    `;

    const { FoundersData, InternsData } = eval(evalCode);

    const teamRows = [];
    let orderIndex = 0;

    for (const f of FoundersData) {
      teamRows.push({
        name: f.name,
        role: f.role || 'Co-founder',
        position: f.position || '',
        image: getImageUrl(f.image),
        email: f.email || '',
        phone: f.phone || '',
        status: f.status || 'Alumni',
        order_index: orderIndex++,
        social: f.social || {}
      });
    }

    for (const i of InternsData) {
      teamRows.push({
        name: i.name,
        role: i.role || 'Member',
        position: i.position || '',
        image: getImageUrl(i.image),
        email: i.email || '',
        phone: i.phone || '',
        status: i.status || 'Active',
        order_index: orderIndex++,
        social: i.social || {}
      });
    }

    if (teamRows.length > 0) {
      const { error } = await supabase.from('teams').insert(teamRows);
      if (error) throw error;
      console.log(`Inserted ${teamRows.length} team members.`);
    }

    // 7. Parse and Seed events table
    console.log("\n--- Seeding events table ---");
    let eventsContent = fs.readFileSync('src/const/data/Events.tsx', 'utf-8');
    eventsContent = eventsContent.replace(/import\s+[\s\S]*?\s+from\s+['"].*?['"]/g, '');
    eventsContent = eventsContent.replace(/import\s+type\s+[\s\S]*?\s+from\s+['"].*?['"]/g, '');
    eventsContent = eventsContent.replace(/: Event\[\]/g, '');
    eventsContent = eventsContent.replace(/export\s+default\s+Events;/g, '');

    const jsxRegex = /highlights:\s*\(\s*(<ul[\s\S]*?<\/ul>)\s*\)/g;
    eventsContent = eventsContent.replace(jsxRegex, (match, p1) => {
      const liMatches = p1.match(/<li>([\s\S]*?)<\/li>/g) || [];
      const items = liMatches.map(li => {
        let text = li.replace(/<\/?li>/g, '').trim();
        text = text.replace(/\s+/g, ' ');
        return text;
      });
      return `highlights: ${JSON.stringify(items)}`;
    });

    const eventImageVars = [
      'LearningStation', 'Discord_session', 'UntoldStories01', 'UntoldStories02', 'UntoldStories03',
      'BuildEMEA', 'BuildEMEA_QNA', 'BuildEMEA_github', 'buildemea_exclusive', 'buildemea_onbording',
      'buildemea_web', 'LinkednandResume', 'ResumeBuilding', 'LevelUp01', 'LevelUp02', 'DigitalMarketing',
      'ChitChat01', 'ChitChat02', 'ChitChat03', 'Shehike02', 'Shehike01', 'BootCamp2022', 'BootCamp2023',
      'Reconnect', 'InternHiring', 'Intern_hiring05', 'OpenMic01', 'OnamMail', 'Veo3', 'AppleEvent',
      'AiExplorer', 'TinkHerHack3', 'ElevateHacknight', 'ProfilePowerup', 'ContentWriting', 'LinkedInResume',
      'Ctrlz', 'Hiring2k26', 'Learn_Go', 'Me_myself', 'Rehuddle', 'RehuddlePanel', 'Resume_build25',
      'Sketchup', 'Sketchup2', 'Steamit1', 'Steamit2', 'Toolup_notion', 'Toolup_airtable', 'Untilthen',
      'Api_keys_openmic', 'Onathall', 'BootCamp2024', 'Ai_tools', 'Gigxplore', 'Art_writing', 'Steamit3',
      'TinkerHerHackHackathon3'
    ];

    const eventDeclarations = eventImageVars.map(v => `const ${v} = "${v}";`).join('\n') + '\n';
    
    const evalEventCode = `
      ${eventDeclarations}
      ${eventsContent}
      ; (function() { return Events; })()
    `;

    const rawEvents = eval(evalEventCode);
    const eventRows = [];

    for (const e of rawEvents) {
      let dbDate = '2024-01-01';
      if (e.date) {
        // Handle both DD/MM/YYYY and DD-MM-YYYY (and DD-MM-YY)
        const parts = e.date.split(/[\/\-]/);
        if (parts.length === 3) {
          let [d, m, y] = parts;
          // If year is 2-digit, assume 20xx
          if (y.length === 2) y = '20' + y;
          dbDate = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        }
      }

      const imageUrl = getImageUrl(e.image);

      eventRows.push({
        title: e.title,
        date: dbDate,
        time: e.time || '',
        location: e.location || 'Seminar Hall',
        description: e.description || '',
        big_description: e.big_description || '',
        thumbnail: imageUrl,
        gallery: [],
        link: e.link || '',
        type: 'Talk Session',
        coordinator_name: '',
        coordinator_whatsapp: '',
        status: 'published',
        reg_status: 'closed',
        highlights: e.about?.highlights || []
      });
    }

    if (eventRows.length > 0) {
      const { error } = await supabase.from('events').insert(eventRows);
      if (error) throw error;
      console.log(`Inserted ${eventRows.length} events successfully.`);
    }

    // 8. Seed projects table
    console.log("\n--- Seeding projects table ---");
    try {
      await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    } catch (err) {
      console.warn("Failed to clear projects:", err.message);
    }

    const projectRows = [
      {
        name: "Connect Foundation Website",
        description: "The official live website of the Connect Foundation community.",
        url: "https://connectfoundation.in/",
        category: "Website",
        status: "Active"
      },
      {
        name: "Hiring Portal",
        description: "Official portal for hiring campaigns, applications, and openings for Connect EMEA.",
        url: "https://hiring.connectemea.in",
        category: "Website",
        status: "Active"
      },
      {
        name: "Interns Portal",
        description: "Tracking, assignments, and onboarding dashboard for active community members.",
        url: "https://interns.connectemea.in",
        category: "Website",
        status: "Active"
      },
      {
        name: "Elevate Hacknight",
        description: "Dedicated portal for tracking and registrations of Elevate Hacknight events.",
        url: "https://elevate.connectemea.in",
        category: "Website",
        status: "Active"
      },
      {
        name: "Connect EMEA Website Vercel",
        description: "Alternative design deployment of the main community website on Vercel.",
        url: "https://connect-emea-website.vercel.app",
        category: "Website",
        status: "Active"
      },
      {
        name: "GitHub Organization",
        description: "Official GitHub Organization hosting all community code bases and projects.",
        url: "https://github.com/connectemea",
        category: "Website",
        status: "Active"
      },
      {
        name: "Letterpad Blog",
        description: "The community writing and blogging portal for sharing stories and knowledge.",
        url: "https://connect-letterpad.vercel.app/",
        category: "Website",
        status: "Active"
      },
      {
        name: "Events Upload Portal",
        description: "Asset and banner upload manager for scheduled community events.",
        url: "https://connect-events-upload.vercel.app/",
        category: "Website",
        status: "Active"
      },
      {
        name: "Bibliotheca",
        description: "The official resources, documents, and books archive of the community.",
        url: "https://bibliotheca.connectemea.in/",
        category: "Website",
        status: "Active"
      },
      {
        name: "Build EMEA",
        description: "The official builder platform and QA portal for the community.",
        url: "https://buildemea.connectemea.in/#/",
        category: "Website",
        status: "Active"
      }
    ];

    const { error: projError } = await supabase.from('projects').insert(projectRows);
    if (projError) {
      console.warn("Failed to insert project seed data:", projError.message);
    } else {
      console.log(`Inserted ${projectRows.length} projects successfully.`);
    }

    console.log("\n--- Seeding completed successfully! ---");
  } catch (error) {
    console.error("\nSeeding failed with error:", error.message || error);
    process.exit(1);
  }
}

run();
