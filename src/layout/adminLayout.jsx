import React, { useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Home, Users, Menu, X, Spade } from "lucide-react";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import AuthRoleRequire from "@/components/router/AuthRoleRequire";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      delay: 0.1,
    },
  },
};

const overlayVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const navItemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const NavItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      route: "/dashboard",
    },
    {
      name: "Interns",
      icon: <Users className="h-5 w-5" />,
      route: "/dashboard/interns",
    },
    {
      name: "Events",
      icon: <Spade className="h-5 w-5" />,
      route: "/dashboard/events",
    },
    {
      name: "Form Data",
      icon: <Users className="h-5 w-5" />,
      route: "/dashboard/responses",
    },
    {
      name: "Queries",
      icon: <Users className="h-5 w-5" />,
      route: "/dashboard/queries",
    }
  ];

  const handleNavigate = useCallback(
    (route) => {
      navigate(route);
      setMobileOpen(false);
    },
    [navigate]
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("You have successfully signed out");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AuthRoleRequire role="admin">
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        {/* Desktop Sidebar */}
        <motion.aside
          className={cn(
            "hidden md:flex flex-col border-r bg-muted/40 bg-blue-950 text-white",
            collapsed ? "w-20" : "w-64"
          )}
          initial={false}
          animate={{ width: collapsed ? 80 : 256 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="flex h-16 items-center px-4  bg-blue-950 text-white">
            <motion.h1
              className={cn(
                "text-xl font-semibold text-primary whitespace-nowrap overflow-hidden",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}
              initial={false}
              transition={{ duration: 0.2 }}
            >
              CMS Admin
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-full"
              onClick={toggleSidebar}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={collapsed ? "menu" : "close"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {collapsed ? (
                    <Menu className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-4">
              {NavItems.map((item) => (
                <motion.div
                  key={item.route}
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Button
                    variant={pathname === item.route ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 overflow-hidden",
                      collapsed ? "px-3" : "px-4",
                      pathname === item.route && "font-semibold"
                    )}
                    onClick={() => handleNavigate(item.route)}
                  >
                    {item.icon}
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: collapsed ? 0 : 1,
                        width: collapsed ? 0 : "auto",
                        transition: { duration: 0.2 },
                      }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  </Button>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="p-4 ">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-destructive hover:text-black overflow-hidden",
                    collapsed ? "px-3" : "px-4"
                  )}
                >
                  <LogOut className="h-5 w-5" />
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: collapsed ? 0 : 1,
                      width: collapsed ? 0 : "auto",
                      transition: { duration: 0.2 },
                    }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    Sign Out
                  </motion.span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to sign out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be redirected to the sign in page. Make sure
                    you've saved your work before signing out.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignOut}>
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 md:hidden"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-blue-950 text-white border-r md:hidden"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex h-16 items-center px-4 ">
                  <h1 className="text-xl font-semibold text-primary">
                    CMS Admin
                  </h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="space-y-1 px-2">
                    {NavItems.map((item, index) => (
                      <motion.div
                        key={item.route}
                        variants={navItemVariants}
                        initial="closed"
                        animate="open"
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant={
                            pathname === item.route ? "secondary" : "ghost"
                          }
                          className="w-full justify-start gap-3 px-4"
                          onClick={() => handleNavigate(item.route)}
                        >
                          {item.icon}
                          {item.name}
                        </Button>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                <div className="p-4 ">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-destructive hover:text-black px-4"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to sign out?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be redirected to the sign in page. Make sure
                          you've saved your work before signing out.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSignOut}>
                          Sign Out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="flex h-16 items-center gap-4 border-b border-gray-300  px-4 md:px-6  text-black">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden bg-blue-950 text-white"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>

            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {NavItems.find((item) => item.route === pathname)?.name ||
                  "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* User profile or other header items can go here */}
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
            <motion.div
              key={pathname}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mx-auto max-w-7xl"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </AuthRoleRequire>
  );
}

export default AdminLayout;
