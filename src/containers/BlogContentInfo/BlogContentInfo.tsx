import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import classes from "./BlogContentInfo.module.css";

const BlogContentInfo = () => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <p>
          Experiences | <span>Video</span>
        </p>
        <h2>Cruising in Quarantine</h2>
        <p>
          Amid the COVID-19 pandemic, a young family takes a break from long
          voyages and finds joy staying put in a small bay in Mexico.
        </p>
      </div>

      <div>
        <h4>Video by</h4>
        <p>Dominican media</p>
      </div>

      <div>
        <h4>Text by</h4>
        <p>David Nabarro</p>
      </div>

      <div>
        <h4>Posted</h4>
        <p>November 1</p>
      </div>

      <div>
        <a>
          <Facebook />
        </a>

        <a>
          <Instagram />
        </a>

        <a>
          <Twitter />
        </a>
      </div>
    </section>
  );
};

export default BlogContentInfo;
