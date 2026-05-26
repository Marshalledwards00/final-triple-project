import './About.css'

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__avatar" aria-hidden="true">
          <span className="about__avatar-smile">☺</span>
          <span className="about__avatar-text">Placeholder image.</span>
          <span className="about__avatar-text">Put an image of yourself here.</span>
        </div>
        <div>
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            This block describes the project author. Here you should indicate your
            name, what you do, and which development technologies you know.
          </p>
          <p className="about__text">
            You can also talk about your experience with TripleTen, what you learned
            there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About