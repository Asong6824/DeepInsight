// src/components/layout/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import SearchInput from '../ui/SearchInput';

// 1. 为导航链接对象定义一个明确的类型接口 (Interface)
interface NavLink {
    label: string;
    href: string;
    type: 'page' | 'scroll'; // 使用联合类型让 type 更精确
}

// 2. 将该类型应用于 navLinks 数组
const navLinks: NavLink[] = [
];

// 3. 使用 React.FC (Functional Component) 来定义组件类型
const Navbar: React.FC = () => {
    // 4. useState 会根据初始值自动推断类型，但也可以显式声明
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    // 5. 为函数添加返回值类型 (void 表示该函数没有返回值)
    const scrollToTop = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavLinkClick = (): void => {
        setIsMobileMenuOpen(false);
    };

    // 6. 为事件对象 'e' 添加精确的 React 事件类型
    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        setIsMobileMenuOpen(false);
        if (window.location.pathname === '/') {
            e.preventDefault();
            scrollToTop();
        }
    };

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navBackgroundClass = isScrolled || isMobileMenuOpen
        ? "bg-[#f4a443]/80 backdrop-blur-md shadow-lg"
        : "bg-transparent";

    const textClass = "text-black transition-colors duration-200";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            onClick={handleLogoClick}
                            className="text-2xl font-bold text-white" // <-- 修改这里
                        >
                            DeepInsight
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center">
                        <div className="ml-10 flex items-baseline space-x-1">
                            {navLinks.map((linkItem) => (
                                <Link
                                    key={linkItem.label}
                                    href={linkItem.href}
                                    onClick={handleNavLinkClick}
                                    className="px-3 py-2 rounded-md text-lg font-medium text-white hover:text-amber-400" // <-- 修改这里
                                >
                                    {linkItem.label}
                                </Link>
                            ))}
                        </div>
                        <div className="ml-4">
                            <SearchInput/>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        {/* 移动端菜单按钮的颜色可能也需要调整为白色 */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="p-2 rounded-md inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" // <-- 添加 text-white
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <Cross1Icon className="block h-6 w-6" aria-hidden="true"/>
                            ) : (
                                <HamburgerMenuIcon className="block h-6 w-6" aria-hidden="true"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 移动端展开菜单的样式也需要相应调整 */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black" id="mobile-menu"> {/* <-- 建议也改为 bg-black */}
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((linkItem) => (
                            <Link
                                key={linkItem.label}
                                href={linkItem.href}
                                onClick={handleNavLinkClick}
                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800" // <-- 修改这里
                            >
                                {linkItem.label}
                            </Link>
                        ))}
                    </div>
                    <div className="px-5 pb-3">
                        <SearchInput/>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;