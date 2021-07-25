import React from "react";

import Banner from "../components/banner";

import "./css/ourStory.css";

var aa = ">"; // Just to remove a useless error

function WhyUs() {
  return (
    <div>
      {/* <UpNavBar />
        <NavBar /> */}
      <div class="content why-us">
        <Banner title="Why us?" />

        {/* <div class="znav">
            <div class="tp">
              <a href="#">Home</a>
              <label>
                <label class="space"></label> {aa} <label class="space"></label>
                Our Story
              </label>
            </div>
          </div> */}

        <div class="content-container">
          <div class="col">
            <div class="grid-item left">
              <label>OUR MISSION</label>
              <p>
                Every day we hear success stories of women who are breaking old
                age barriers and traditions, forging their own path and
                achieving great thing in work and life, whether in fields and
                farms, or in the office, or in managing the household.
                <br></br>
                <br></br> For these talented and young women who move out of
                their comfort zones to strive for better everyday it's important
                for them to feel snugly with their clothing. Well- fitted Women
                workwear is what they need to feel more confident , zestful and
                nimble.
              </p>
            </div>
            <div class="grid-item left">
              <label>OUR PHILOSOPHY</label>
              <p>
                We in Sooti believe in the philosophy that there is pure and
                simple beauty to the everyday hustle of women who break away
                from stereotype and are finding their place in the workplace,
                working shoulder to shoulder.
              </p>
            </div>
          </div>
          <div class="col">
            <div class="grid-item right">
              <label>OUR STORIES</label>
              <p>
                Our Functional clothing garments are with design lines related
                to body fit, proportion & particular demands of the body and
                end-use. In creating functional garments ,we've made sure to
                avail you with the fashionable demands and protection .
              </p>
            </div>
            <div class="grid-item right">
              <label>OUR APPROACH</label>
              <p>
                Our garments are made with love and resilience.Dignified style
                which gives you solace, professional mein and an alluring look
                that you need. Sustainable and engineered to make you move a
                step closer to rectitude. Crafted in the beauty of handloom
                fabric, our workwear line can be carried out from day to night
                embracing everyday mood for women who are too busy chasing their
                dreams.
              </p>
            </div>
          </div>
          {/*  */}
          <div class="quote">
            <label>
              Sooti Studio is a premium thoughtful workwear brand precisely
              crafted for the everyday hustle of a modern age woman who inspires
              us in day-to-day life. <br></br>
              <br></br>Our Product designed is inspired by natural fabric, dyes,
              locally sourced materials, and artisan design, our color tones &
              hues are feeling free naturally vivid, with calming clay tones and
              an unbleached white ground palette to offer a sense of comfort and
              reassurance. Exploration of flora and fauna, natural resources
              work well with our Quintessence angle. <br></br>
              <br></br>
              Our love encompasses beyond the product, as our handcrafted
              products create a livelihood for artisans across the country.
              <br></br>Our silhouette is modern and relaxed luxury with
              sustainability by producing beautiful transseasonal pieces for
              women made from eco-friendly materials. Designed and developed
              with love, Sooti Studio is the perfect label for anyone with a
              timeless and practical approach to fashion.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
