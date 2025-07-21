import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '../contexts/ThemeContext';
import { useContent } from '../contexts/ContentContext';
import SearchModal from './DocsPage/SearchModal.tsx';
import logoSrc from '../assets/logo.svg';
import SettingsPopup from "./SettingsPopup.tsx";

const VersionSwitcher = () => {
  const { versions, pages } = useContent();
  const location = useLocation();

  const currentVersion = location.pathname.split('/docs/')[1]?.split('/')[0] || versions[0] || '';

  const getFirstPageForVersion = (version: string) => {
    const versionPages = pages.filter(p => p.version === version);
    if (versionPages.length === 0) return 'introduction';
    versionPages.sort((a, b) => (a.navOrder || 99) - (b.navOrder || 99));
    return versionPages[0].slug;
  };

  if (!versions || versions.length === 0) {
    return null;
  }

  return (
      <Dropdown>
        <DropdownTrigger>
          <Button
              variant="bordered"
              className="capitalize text-sm w-full sm:w-auto"
              endContent={<Icon icon="heroicons:chevron-down" className="text-small" />}
          >
            {currentVersion}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
            aria-label="Version selection"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={[currentVersion]}
        >
          {versions.map((version) => (
              <DropdownItem key={version}>
                <Link
                    to={`/docs/${version}/${getFirstPageForVersion(version)}`}
                    className="w-full block"
                >
                  {version}
                </Link>
              </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
  );
};


const Header: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDocsPage = location.pathname.includes('/docs');

  const navbarClasses = `
    w-full sm:max-w-5xl sm:rounded-full px-4 py-2 
    transition-colors duration-300
    ${
      theme === 'light'
          ? 'bg-white/75 backdrop-blur-lg border-neutral-200/80'
          : 'bg-[#1C1C1C]/75 backdrop-blur-lg border border-neutral-800'
  }
  `;

  const activeLinkClasses = theme === 'light' ? 'text-black' : 'text-white';
  const inactiveLinkClasses = theme === 'light' ? 'text-neutral-500' : 'text-neutral-400';
  const iconClasses = theme === 'light' ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white';
  const brandTextClasses = theme === 'light' ? 'text-black' : 'text-white';

  const navLinks = [
    {
      label: 'Home',
      href: '/',
      isActive: location.pathname === '/',
    },
    {
      label: 'Documentation',
      href: '/docs',
      isActive: location.pathname.startsWith('/docs'),
    },
  ];

  return (
      <>
        <div
            className={`fixed top-0 left-0 w-full flex justify-center sm:p-4 z-50 transition-transform duration-300 ease-in-out ${
                isExpanded ? 'translate-y-0' : '-translate-y-full'
            }`}
            aria-hidden={!isExpanded}
        >
          <Navbar
              className={navbarClasses}
              height="60px"
              isMenuOpen={isMenuOpen}
              onMenuOpenChange={setIsMenuOpen}
              isBordered={isMenuOpen} // Adds a border when menu is open for better separation
          >
            {/* Left Section: Hamburger (mobile) + Brand + Desktop Nav */}
            <NavbarContent justify="start" className="gap-2 sm:gap-6">
              <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
              />
              <NavbarBrand>
                <Link to="/" className="flex items-center gap-2">
                  <img src={logoSrc} alt="SoundFlow Logo" className="h-8 w-8" />
                  <span className={`font-bold hidden sm:inline ${brandTextClasses}`}>
                  SoundFlow
                </span>
                </Link>
              </NavbarBrand>
              <div className="hidden sm:flex gap-6">
                {navLinks.map((link) => (
                    <NavbarItem key={link.href}>
                      <Link
                          to={link.href}
                          className={`text-sm transition-colors hover:${activeLinkClasses} ${
                              link.isActive ? `font-medium ${activeLinkClasses}` : inactiveLinkClasses
                          }`}
                      >
                        {link.label}
                      </Link>
                    </NavbarItem>
                ))}
              </div>
            </NavbarContent>

            {/* Right Section: Icons and Actions */}
            <NavbarContent justify="end" className="gap-2">
              <NavbarItem>
                <SearchModal />
              </NavbarItem>
              {isDocsPage && (
                  <NavbarItem className="hidden sm:flex">
                    <VersionSwitcher />
                  </NavbarItem>
              )}
              <NavbarItem>
                <SettingsPopup />
              </NavbarItem>
              <NavbarItem>
                <Button
                    isIconOnly
                    variant="light"
                    onPress={() => setIsExpanded(false)}
                    aria-label="Minimize header"
                    className={iconClasses}
                >
                  <Icon icon="heroicons:chevron-up" className="text-xl" />
                </Button>
              </NavbarItem>
            </NavbarContent>

            {/* Mobile Menu Drawer */}
            <NavbarMenu className={`pt-4 ${theme === 'light' ? 'bg-white' : 'bg-[#1C1C1C]'}`}>
              {navLinks.map((link) => (
                  <NavbarMenuItem key={link.href}>
                    <Link
                        to={link.href}
                        className={`w-full block text-lg ${
                            link.isActive ? activeLinkClasses : inactiveLinkClasses
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </NavbarMenuItem>
              ))}
              {isDocsPage && (
                  <NavbarMenuItem className="mt-2">
                    <VersionSwitcher />
                  </NavbarMenuItem>
              )}
            </NavbarMenu>
          </Navbar>
        </div>

        {!isExpanded && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
              <Button
                  variant="flat"
                  onPress={() => setIsExpanded(true)}
                  aria-label="Expand header"
                  className={`shadow-lg transition-all ${
                      theme === 'light'
                          ? 'bg-white/90 backdrop-blur-md'
                          : 'bg-neutral-800/90 backdrop-blur-md text-white'
                  }`}
              >
                <Icon icon="heroicons:chevron-down" className="text-lg" />
              </Button>
            </div>
        )}
      </>
  );
};

export default Header;