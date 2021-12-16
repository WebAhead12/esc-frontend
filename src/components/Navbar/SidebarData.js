import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Games',
        path: '/Games',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Teams',
        path: '/teams',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
];