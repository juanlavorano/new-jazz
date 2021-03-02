import React from 'react'
import logo from '../assets/NJ.svg'
import { FaFacebook } from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaYoutube} from 'react-icons/fa'

export function Footer() {
    return (
        <div className='footer padding-global'>
            <a className='footer__logo'><img src={logo}></img></a>
            <div className='footer__social'>
                <FaFacebook className='footer__social__item' style={{marginRight: '20px'}} size={20}/>
                <FaInstagram className='footer__social__item' style={{marginRight: '20px'}} size={20}/>
                <FaYoutube className='footer__social__item' style={{ marginRight: '20px' }} size={20}/>
            </div>
            <div className="footer__links">
                <a className='footer__links__link'>About Us</a>
                <a className='footer__links__link'>Privacy Policy</a>
                <a className='footer__links__link'>Cookie Policy</a>
            </div>
            <div className="footer__copyright">
                &copy; New Jazz. All rights reserved.
            </div>
        </div>
    )
}