import '../../css/Footer.css'

const Footer = () => {
    return(
        <footer>
            <div class="link">
            <div class="box title">
                JoyCodeMe
            </div>
            <div class="box">
                Learn
                <br /><br />
                <a href="#">Introduction</a><br />
                <a href="#">Practice</a><br />
                <a href="#">Ask and Questions</a><br />
            </div>
            <div class="box">
                Code
                <br /><br />
                <a href="#">Code Management</a><br/>
                <a href="#">Libraries</a><br/>
                <a href="#">API</a><br/>
            </div>
            <div class="box">
                More
                <br/><br/>
                <a href="#">Logo and Brand</a><br/>
                <a href="#">Code Producer</a><br/>
            </div>
            <div class="box">
                Follow
                <br/><br/>
                <a href="#">Instagram</a><br/>
                <a href="#">GitHub</a><br/>
                <a href="#">Discord</a><br/>
            </div>
            </div>
            <div class="policy">
            For web site terms of use, trademark policy and general project policies please see https://jocomi.org
            </div>
            <div class="copywrite">
            CopyWrite @ 2024 Jocomi Foundation. All rights reserved
            </div>

        </footer>
    )
}
export default Footer;