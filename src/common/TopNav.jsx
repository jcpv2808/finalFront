import React from 'react'

//vendor styles
import '../assets/vendor/fontawesome/css/font-awesome.css'
import '../assets/vendor/animate.css/animate.css'
import '../assets/vendor/bootstrap/css/bootstrap.css'

//app styles
import '../assets/styles/pe-icons/pe-icon-7-stroke.css'
import '../assets/styles/pe-icons/helper.css'
import '../assets/styles/stroke-icons/style.css'
import '../assets/styles/style.css'

//scripts
import '../assets/vendor/pacejs/pace.min.js'
import '../assets/vendor/jquery/dist/jquery.min.js'
import '../assets/vendor/bootstrap/js/bootstrap.min.js'

//luna scripts
import '../assets/scripts/luna.js'

function TopNav() {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <div id="mobile-menu">
                        <div className="left-nav-toggle">
                            <a>
                                <i className="stroke-hamburgermenu"></i>
                            </a>
                        </div>
                    </div>
                    <a className="navbar-brand">
                        Tagliatore
                        <span>v.1.0</span>
                    </a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <div className="left-nav-toggle">
                        <a >
                            <i className="stroke-hamburgermenu"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopNav