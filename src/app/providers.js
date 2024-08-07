'use client';

import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { HeaderWSideNav } from '@/components/Header/Header';
import { Content, Theme } from '@carbon/react';
import { ThemeContext } from '@/utils/ThemeContext';
import { usePathname, useRouter } from 'next/navigation';
import { ISLOGIN } from '@/utils/constants';

export default function Providers({ children }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  function toggleSideNavExpanded() {
    setIsSideNavExpanded(!isSideNavExpanded);
  }
  const { theme, setTheme } = useContext(ThemeContext);
  const path = usePathname();
  const router = useRouter();
  useLayoutEffect(() => {
    const isLogin = window.sessionStorage.getItem(ISLOGIN);
    if (!isLogin) {
      router.replace('/login');
      return;
    }
    if (
      path != '/login' &&
      (isLogin == null || (isLogin != null && isLogin.toString() == 'false'))
    ) {
      router.replace('/login');
      return;
    }
  });
  return (
    <>
      {path != '/login' && (
        <>
          <Theme theme={theme.headerTheme}>
            <HeaderWSideNav
              isExpanded={isSideNavExpanded}
              toggleSideNavExpanded={toggleSideNavExpanded}
            />
          </Theme>
          <Theme theme={theme.contentTheme}>
            <Content
              className="pt-20 h-full min-h-screen pr-2"
              // className={`pt-20 h-screen transition-[margin-left] duration-110 ease-in-out ${
              //   isSideNavExpanded ? 'ml-52' : 'ml-0'
              // }`}
            >
              {children}
            </Content>
          </Theme>
        </>
      )}
      {path == '/login' && <>{children}</>}
    </>
  );
}
