import FeatureCards from './Card';
import './Home.css'
import Navbar from './Navbar';

function Home() {

  return (
    <>
      <Navbar/>

      {/* Hero Section Below Navbar */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Book Events with Ease</h1>
          <p>Explore and book your favorite events quickly and conveniently.</p>
          <div className="cta-buttons">
            <h3>Five Stat Ratings |</h3><p>⭐⭐⭐⭐⭐</p>
            
          </div>
        </div>
      </section>

       {/* Brand Showcase Section */}
  <section className="brand-showcase">
    <h3 className="brand-title">Events created by thousands of organizations around the globe</h3>
    <div className="brand-logos">
      <img src="data:image/jpeg;base64,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" alt="Brand Logo 1" />
      <img src="https://www.eventbookings.com/wp-content/uploads/2023/08/Logos_APC-02.png" alt="Brand Logo 2" />
      <img src="https://www.eventbookings.com/wp-content/uploads/2023/08/covey-theater-logo.png" alt="Brand Logo 3" />
      <img src="https://images-platform.99static.com//l0_Fneys3NAiG7XbNSX-GUsXg1A=/200x200:1800x1800/fit-in/500x500/99designs-contests-attachments/70/70531/attachment_70531315" alt="Brand Logo 4" />
      <img src="https://www.eventbookings.com/wp-content/uploads/2023/08/vilamoura-logo1.png" alt="Brand Logo 5" />
    </div>
  </section>

    <FeatureCards/>

  <footer className="footer">
  <div className="footer-container">
    <div className="footer-section brand">
      <h2 className="brand-name">Event<span>PlanPal</span></h2>
      <p>Your go-to place for discovering and creating unforgettable events.</p>
    </div>

    <div className="footer-section links">
      <h4>Explore</h4>
      <a href="#">Features</a>
      <a href="#">Events</a>
      <a href="#">Create Event</a>
      <a href="#">About Us</a>
      <a href="#">Contact</a>
    </div>

    <div className="footer-section socials">
      <h4>Follow Us</h4>
      <div className="social-icons">
        <a href="#"><img src="/assets/twitter.svg" alt="Twitter" /></a>
        <a href="#"><img src="/assets/facebook.svg" alt="Facebook" /></a>
        <a href="#"><img src="/assets/instagram.svg" alt="Instagram" /></a>
        <a href="#"><img src="/assets/linkedin.svg" alt="LinkedIn" /></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Event PlanPal. Crafted with ❤️ by Subalakshmi.</p>
  </div>
</footer>
    </>
  );
}

export default Home;