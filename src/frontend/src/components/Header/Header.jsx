import React from 'react';

import cl from './header.module.css';

const Header = ({openMenu}) => {

    return (
        <div className={cl.header}>
            <button className={cl.MenuButton} onClick={openMenu}/>
            <div style={{margin: 'auto', fontSize: 'xx-large', color: 'white', textShadow: 'textShadow: text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'}}>
                Pinboard
            </div>
            <a href="https://github.com/HaCK3R322/Pinboard" target='_blank'>
                <button className={cl.GitHubButton}/>
            </a>
        </div>
    );
};

export default Header;