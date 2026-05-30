import './About.css'
import authorImage from '../assets/author.jpg'

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__avatar" src={authorImage} alt="Author portrait" />
        <div className="about__textblock">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            My name is William Edwards and I'm an aspiring software developer driven
            by curiosity and a commitment to continuous learning. I work with
            JavaScript, HTML, CSS, Git/GitHub, Node.js, REST APIs, and MongoDB, and
            I'm currently completing the TripleTen Software Development Program,
            where I've built full-stack applications and strengthened my ability to
            break down problems, debug effectively, and write clean, maintainable
            code.
          </p>
          <p className="about__text">
            TripleTen has pushed me to grow through real-world projects and hands-on
            practice, helping me develop both technical skills and a developer
            mindset. I'm still early in my journey, but I'm dedicated to improving
            every day and expanding my abilities to meet the needs of future
            clients. I bring persistence, patience, and a willingness to learn -
            qualities that help me deliver reliable features while continuing to
            evolve as a developer.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About