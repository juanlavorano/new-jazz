import React from 'react';
import { NavMenu } from './NavMenu';
import {Footer} from './Footer'

export function Layout({children}) {
  
    return (
      <div>
        <NavMenu />
        <div>
          {children}
        </div>
        <Footer />
      </div>
    )
  }

