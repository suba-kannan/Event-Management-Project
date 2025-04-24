import FeatureCards from './Card';
import './Home.css'
import Navbar from './Navbar';

function Home() {

  return (
    <>
      <Navbar/>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Book Events with Ease</h1>
          <p>Explore and book your favorite events quickly and conveniently.</p>
          <div className="cta-buttons">
            <h3>Five Stat Ratings |</h3><p>⭐⭐⭐⭐⭐</p>
            
          </div>
        </div>
      </section>

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
      <a href="http://localhost:5173/feature">Features</a>
      <a href="#">Events</a>
      <a href="#">Create Event</a>
      <a href="#">About Us</a>
      <a href="#">Contact</a>
    </div>

    <div className="footer-section socials">
      <h4>Follow Us</h4>
      <div className="social-icons">
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?ga=GA1.1.2016052138.1744441668&semt=ais_hybrid&w=740" alt="Twitter" />
        </a>

        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdG2d2A_Icy7wMXjLLZNE8R4ozzPYO6MxLTw&s" alt="Facebook" />
        </a>   

        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDxAQDRAPDxANEBUPDw0OEA8PEA8PFREXFhURFxUYHSggGBolGxUVITEhJyktLi4uFx8zOTMtNygtLisBCgoKDQ0NFQ0PFS0ZFR0rLSsrNzcrKysrKy0rKy03KysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBgcIBQT/xABSEAABAwIBBwUGEA0CBwAAAAABAAIDBBEFBgcSITFBUQgTYXGBIjJCUpGSFBYXIzM1VHJzk5ShssHC0iVDVWJ0dYKisbO00dOjwxUkNFNjg/D/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/ANIlERZZLqLqbJZURdTdLKLoJul1F0uhE3S6p0lF0ixXdRdU3S6Qiq6XVN0ukIqul1TdLpCKrpdU3S6Qiq6XVN0ukIqupuqLpdIRXdLqi6XSEV3S6pBUoibpdQiCbpdQiCbpdQiCbooUoBRHKAglLoigJZFO5BQ5UqSoWmhERARFIBJsNZOoAbSUEIvVhybxB4vHRVjxxZTTuHzNX0MyLxZ2zDcQ+SVA/i1B4SLIhkJjH5Nrfk8g+pVekLGPybW/ESf2QY2iyT0hYz+Ta34h/wDZR6QsY/Jtb8RJ/ZBjiLIH5D4uNuG1/ZSzH+DVYfknibe+w+vHXSVA+yg8ZFfqqSWI6M0ckTvFkY5h8hCsICIiAqgVSiC4ipaVUoyIiKAiIgIiIDlAUlFQREUBUvVSpcrhilERVoXp5PYBVV87aeiidLI7Wbamsbve92xrek9W0qMncEnr6qKlpW6UsztEX1NY3a57juaBcnqXWWReSdNhVK2CmaC42M05AEk8lu+d0bbDcO24YJklmPooWtfibzVzaiYWF0dO08NVnP6zYHgtmYZg1LSt0aSngp28IYmR367DWr1fWxQRulqJGRRRi75JHBjWjpJWrsfz7UEJLaGCasI/GOPoaI9RcC/ytCDbKLnqrz+159hpKNg3c5z0p+ZzV8Ts+2LnZFQDqhm+uRB0ipXNRz5Yx4tF8S/76j1csZ8Wj+Jf99B0si5p9XLGfFo/iX/fU+rljHi0XxL/AL6DpVFzY3PpjA8ChPXDL9Uivw5+sUB7unoHDgI6hp8vOFB0TLE14LXta9p2tcA4HsKwvKPNVg9aCfQ4pZDsmo7QkHiWAaB7RfpWDYXygASBWUBDd8lNMHEdUbwL+ctoZK5aYfibSaKcOe0XfA8GOZnSWHaNe0XHSg52y+zY1uFXl/6mkvYVMbSDHfYJWeBr1XuRs13Nlgq7gmia9rmva1zXgtcxwDmuaRYtIO0Fc054s3v/AA2YVNI0+gql1tHb6GmOvm/enWWnoI3C4a1REQSFWrarCmpqURFEEREBERAKgqSoKolFAUoCodtVaodtTDEIiKtOguTvk02OllxGQDnKpxhhJ8GCN1nke+eCD8GFtqtq44YpJpnBkcLHSSPdsaxouSewL4Mk8NFLQUlOBbmKeNjul4YNI9rrntWCcoPGjBhbKdjrOrpgx2uxMMY032/a5sdRKDTmcbLuoxeoLiXR0sTj6Gpr6mjZzj7ai8jyXsOnEERAREQERffQYLWVA0qalqZx40MMso8rQUHwIvYlyVxNgu/D65oG91LUNHztXkOaQSCCCDYg6iDwsghS1pJAAuTqAGsk8FC2TmCwyKfGNKZod6Epn1ETTrHOh8bA63QJCR0gHcg8ukzU45LEJW0TmgjSaySWGKUg/mOcCOo2KxoGrw+qHstLVUr76wWSRvA4cCD1EHgV2mtK8pHCoeZo6sACfnTTOcLXfEWOeAeOiWm3vygzXNZlw3F6MukAZVUxEdTG21iSO5laNzXWOrcQRwJyLKXBYq+jnpJh3FRGWXsCWO2skHS1wBHUubMyWNGlxmBulaOsBpZATqJcLx9um1o7TxXUyDiOvpHwTSwyi0kEjopBwexxa4eUFWFsDPnhogxudzRYVUcdQB0uboO8rmOPatfoCrCoVYU1NSiIogiIgIiIBUFSVBVEhERQFQ7aq1Q7arhiF9WGQCSeGM7JZWMPU54H1r5V6uSjb4hQjjVwDyzNVadnLQvKWmvPhzPFimf5zmD7C30ueuUlJ+EKRvi0ml5Znj7KDUKIiAstyDyArMXkPMjmqeM2lq5ATG07dBo8N9tw2XFyLhUZuMjpMWrWwAuZBEOcqpgO8iv3oOzTdsHaddiur8Lw6Gmhjgpo2xRQt0WRtFgB9ZO0naSUGKZK5r8KoA0tgFTMNZqKoNldfbdrSNFnYL9JWaAW1DUBuXjZU5VUWGxc7XTCMOvzcY7qWUjcxg1ndr2C+shagxnP7MXEUFFG1o72Sqe57iOJYywb1aRQb5Xk47k1Q1zS2tpoZxawc9oEjQfFkHdN7CFoyjz94kHev01FI3xYxNE7zi938FsnIrO1h+IubC+9HUvsGwzOBZI4+CyXUCeggE7gUGvsv8yslO19RhBfURNu59G/up2DaebI9kA8XvtXhFa3yRyimwysiq4LF0ZIfG4kNljdqdG7r+YgHcuyVpHPnm+boPxWiZZzddbExupwJt6IAG8eF0d1uJIZFR578HdFpy+iYpLa4DEXuvwDmnRPWSOxadznZevxidhaww01OHCCFxu4lxGlI+2rSNhq2ADrJwpEHqZLTc3iFE8fi6uB/mzNP1Ls9cS4dJozwu8WVjvI4FdtIOeuUlABX0cm99IWHqZK4j6ZWoVunlLt9ew48Yph5HR/3WlkBVhUKsKampREUQREQEREAoAhRqoIhRBF1S5VKkouIXsZHe2eH/ptP/PYvHXsZG+2eH/p1P8Az2Kq7LXOfKPd+FaccKBh8tRP/ZdGLnHlHe21P+r4/wConQaqRFfoacyyxxA2MsjYweBc4D60HUOZjJwUWEwuLbTVwFVKba7OHrbOoMtq4ucsjytygiw6imq59bYW9ywajJITZkY6yRr3C53L1YYwxrWNFmsAa0cABYBaT5SuJODaClB7lxkqHji5oDIz+9J5UGnso8eqcQqZKmreXySHYLhkbN0bB4LRw7dZJK8xEQEREHROY3L59ZG6grXl9RTs04JnXLpoBYFrjve2417SD0Ena80TXtcx4DmPaWua4XDmkWII4WXH2QOJOpcVoZmm2jUsa74OR3NyDzXOXYiDjnLjAjh+I1VJr0YZPWidphcA+M33nRcL9N14S2zyjqIMxKmmH4+kDT0ujkdr8jmjsWpkFTDYg8DddwrhxdxoND8pf2XDvg5/pRrSi3Xyl/ZcO+Dn+lEtKICuNGpW1dbsU1NLJZSijKLJZSiCLIpRBSUahRqqhRCoQFSVUqSi4hexkb7Z4f8Ap1P/AD2Lx17GRvtnh/6bT/z2Kq7LXOPKO9tqf9Xx/wBROujlzlyjh+Fqf9Xx/wBROg1SvrwioEVTBI7vYpo5D1NeCf4L5EQdxhaG5S1K4TYfNY6Lo5Yr7g5rmut26XzFbTzcY6K/CqSe93iIRTcRNGNB9+F7aXU4L586OSn/ABTDpII7c/ERPTE6gZWgjQPQ5pc3hcg7kHJSKuaJzHOZI1zHscWvY8FrmuBsWkHWCDuVCAiIg9XJSldNiFFE0EmWqhZq12vK257BrXZy5/5P+R75Jzik7SIqfSjpbgjnZiNF0g4taC4dZ4tK6AQc+cpKoBraOId9HSueR0PlIH0CtPrMM7GOiuxeqkYdKKJwp4iNhZENEkdBdpntWHoC7jXDoF+1dxIND8pf2XDvg5/pRLSi3Xyl/ZcO+Dn+lEtKICut2K0rrdimpqURFGRERAREQUlGoUaqoUQoghUlVKkouIXrZJOtiNCeFZAf9Zq8lfdgUuhV0zzq0KiJ1+qQFVXaq535SLPwjSu40Yb5JpD9pdELQXKVjtU0D/Ggkb5rwftINMoiINl5lMuG4dVOpqp4bSVpF3u72Co1BshO5pHcuPvTsBXS4K4dW3M2Gd11G1tJihfLTNs2GpAL5adviOG17Bu3jZrFgA2JnFzV02KE1ELhS1hFjKG3jntsEjRv3aQ18b2C0jjOa/GqVxDqOSZo2SUv/MNcOIDe6HaAupsMxKCqibNSyxzxP2SROD233i42Ho3L60HH1HkLi8rtFmHVt+MkEkTfOeAPnWyMisxsrnNlxl4YwWPoKF+k935r5BqaPeknpC3yiCzSU0cUbIoWNjjjaGMjYA1rGgWDQBsCwHPHly3DqMwQPHo2sYWxgbYYjqfMeBtcN6devRKtZf526Oga+GicysrNbQ1h0oIXbLyPG0g+ADfVrIXOOL4pPVzvqKqR0s0pu+R2/gABqAA1ADUEHxoiIL1EzSljb4z2t8rgF26uLcnY9OtpGePUxNt1ytC7SQaG5S59ew4f+Of6Ua0qtx8pSW9XQs8Wne63vpLfZWnEBXW7FaV1uxTU1KIijIiIgIiIKSjUKNVUKIUQQqXKpUlFxCIiqu18HrRUU0E7TdtRDHMCOD2B31rVXKQwsvo6SqaCfQ07onW3MmaDc9GlE0ftL2Mw2UAqsKbTudeXD3cy4Ei/MuJdE7qtpN/YWa5TYLFX0c9JN3lRGW6VrljtrHjpa4A9iDjBF6WUOB1FBUyUtWzQliNt+i9u6Rp3tO0FeagIiIPvwjGaqjfzlHPNTv1XMT3M0rbA4DU4dBWcYfnrxqJtnvp6i3hTwAO/0y1a4RBtGXPrjBFhHQs6WwzE/vSELE8fy8xWuaWVVZK6N1wYY9GGIg+CWRgBw67rGkQEREBERBluajCzVY1QsAJEUwqXkbA2H1zX0EtaO1dbLVGYjIl9HA+uq2aFRWNDYo3Czoqa4dc8C8gG3BreJC2jWVTIY5JZXBkcLHSSPOxrGglzj2BBzZygK0S40WA3NNTRQu6CS6W3klC1qvSylxZ1bWVNU+96mZ0gBtdrCe5Z2NsOxeagK63YrSut2KampREUZEREBERBSUahRqqhUKSiCFS5VKHIuKURFVZRm6yufhNcyoAc+F45qpiB7+EnWQNmk02I6rbyussOr4qiGOene2WKZoeyRusOaf8A7ZuXEqzXN3nFqsIfoD1+ke68lK42sd74z4LvmO/cQHReWeRdFisQZVsIey/NVEZDZYieB3t/NOrt1rSGP5j8UgJNG6GtZu0XCCW3Sx50fI4rd+SmW+HYkwGknbzhF3U0hEc7OILCdduLbjpWRoOQavIDGYu/w6sNv+3C6UeVl18bsk8TG3D68ddJUD7K7KRBxicmcQ9w1vyaf7qelrEPcNZ8mn+6uzkQcY+lrEPcNZ8mn+6npaxD3DWfJp/urs5EHGbclsSOygrj1UtQfsq/DkVizzZuG1/bSztHlLbLsVEHK+F5o8bncAaUU7T+MqZY2AdbQS/91bXyFzNUtC9lRXPFZUMIcxmjo08Thv0TrkIOwmw6Li62ivmxHEIKeMy1MscEbdskr2saO070H0rSOfjL1ug7CqN93OINbI06mgG4pwRvvYu4WA3kC1nEz0hzX02Clwvdr8Qc0tNra+ZadYP55tbXYbCtIveXElxJLjckm5JO0koKUREBXW7FbCuqamiIijIiIgIiIKSgQoiiIioIdiIgtoqnBUqtCIiCpjiCCCQQbgjUQRvBWVYVnIxqmAbFXzFo8GfQqBbh66HEDqWJog2bDnyxlo7ptG/pfC8H914X0sz84rvp8PP/AK6gf7q1SiDbHq94p7moPMqP8ier3inuag8yo/yLU6INser3inuag8yo/wAier3inuag8yo/yLU6INsOz9YpupqAdcdQf91WH59sXOyKgb1QzfXIVq5EGeYhnfxyXUKpsIOotghhb+84Fw8qw/EsUqKl+nVTzVD/AB5pHyEDgC46gvjRAREQERSAglgVaIss6IiIgiIglFCIIKIURRERAREQFBClFRQQoVxEq1bRXAFNkpVpFdslkqVaRXbJZKVaRXbJZKVaRXbJZKVaRXbJZKtWlNlcsiUqgNVYRFEEREBERAREQFKhSgpKIioKURQFCIgIiICIiCQpREQREQEREBERAREQQilEEIiIoiIgIpRBCIiAiIgIiIP/2Q==" alt="Instagram" />
        </a>       

        <a href="https://in.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUAAAD////m5ua2trZUVFT8/Pybm5saGhoEBARaWlpXV1d/f3/5+fnFxcWnp6d4eHi8vLw+Pj4TExNPT08yMjIhISEpKSliYmKvr6/e3t5ycnKjo6ONjY1qamrJycmUlJTW1tZFRUXx8fFTEN6uAAADCklEQVR4nO3ba3OiMBSAYaLG4h2t1ktt6/b//8hFK9HKwbps6AmZ9/m0s3acvMMtAUwSAAAAAAAAAAAAAAAAAAAAAAAAAEA7pdoD+AVvr9lk0t3PtcfRhHz7LabWnHVm0W3RPGc0Nle2y9gSk42x1m3D/F92EFli15T0tMfk1agcaMZP2qPyaGGskDjRHpY3aTIV+vLoiK4aY7mwG83J5k0KPB6J2gPzRtxJj6LZTbOqwp32yHx5ryocaY/Ml0lV4Ux7ZL4IE5ovA+2R+fJRVbjQHpkvzxWBHe2B+dORCz+0x+WPNPHOJzXaw/JJ3Ih77VF5k6bJUlhbvGuPy6+1sd8irdlqD8mvNBncrC8O0d2LShbXM5vx/rTzRiXP+ZN9nq+DEV0mLtLTJlu+jWbDlfZYgKZFdoK69jKfv2iPoTHrzbaYKmw3Ia4q0yeR+3whfLg6LR6PZ+Dn7Ga2MM56xck5FMPjY5mSYnmYJl3h89NNnDxifZBm7Yd1WAdkT1w9XRbA4m2O0bHhSew7Na5CmhXVLUx20vOOQkj3seoWTsUnOl/y/XijmHSjZmHlneTCezDHYq3CXWbEJzqOHYfzgK5W4Vb6z1ubQE43dQrtnWPw6o92YeyotbahfajQhvGsvFbhg8I4FBsstOZZMcxptDCIS0aThdYsFcsKTR6HxvQVywrNFobwCKvZQhPAyr/hwgBeeGi48FUx7ax+4WVec2eKkymmndUuPGZN+rPdvnggIDqohTn/sQ3dpWBUvZQK4GRas9CazvXVvPKWTYsLP7/fUKtKbG9h6c2+ih21vYXT2++R3+loceGqtGqQz6itLTyUv0j+w9YWbsoLP3k3bW1hv1y4jq2wZEChFgopdChUQyGFDoVqKKTQoVANhRQ6FKqhkEIn/sIhhVoopNChUA2FFDoUqqGQQodCNRQ+XPjTF6mJv/D+zpVW/AyvPXtpmsyzbll2eW1tL34uvL4tflG39P7br/vhNy2P/+Sl6i8D+NEMAAAAAAAAAAAAAAAAAAAAAAAAAOCf/AXQ2ikddJe40wAAAABJRU5ErkJggg==" alt="LinkedIn" />
        </a>            
        
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