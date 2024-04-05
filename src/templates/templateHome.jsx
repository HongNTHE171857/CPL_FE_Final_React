import Banner from "../components/Banner";
import Footer from "../components/Footer";
import GlobalFeed from "../components/GlobalFeed";
import Header from "../components/Header";

export default function TemplateHome({ title = "", children }) {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <div className="banner">
                    <Banner />
                </div>
                <div className="row content1">
                    <GlobalFeed/>
                </div>
                <br></br>
                <Footer />
            </div>
            
        </>
    );
}