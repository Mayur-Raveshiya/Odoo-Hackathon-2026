'use client';

import { useAppStore } from '@/store/use-app-store';
import { Menu, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Header() {
  const { toggleSidebar } = useAppStore();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="relative rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute left-2 top-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm cursor-pointer hover:bg-primary/20 transition-colors">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
