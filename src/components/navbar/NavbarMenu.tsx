import { ChangeEvent, ReactNode, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
  },
  menuLinks: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    top: "200px",
    width: "90vw",
    margin: "0 auto",
    "&>nav": {
      display: "block",
      "&>ul": {
        padding: 0,
        margin: 0,
        "&>li": {
          listStyle: "none",
          fontSize: "6rem",
          fontWeight: "700",
          cursor: "pointer",
          height: "135px",
          overflow: "hidden",
          position: "relative",
          width: "700px",
          "&>a": {
            position: "absolute",
            color: "white",
            textDecoration: "none",
            "@media (max-width: 900px)": {
              fontSize: "3rem",
            },
            "&:hover": {
              color: "#191919",
            },
          },
        },
      },
    },
  },
  info: {
    color: "#fff",
    width: "400px",
    "&>h3": {
      fontSize: "1.2rem",
      margin: "8px auto",
    },
    "&>p": {
      fontSize: ".8rem",
      margin: "0 auto",
    },
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  location: {
    position: "absolute",
    bottom: "-80px",
    color: "#fff",
    marginTop: "16px",
    fontSize: ".8rem",
    fontWeight: "600",
    "&>span": {
      "&:first-child": {
        marginLeft: "4rem",
      },
      fontWeight: "400",
      cursor: "pointer",
      margin: "0 2rem",
      transition: ".3s ease-in-out",
      "&:hover": {
        background: "#191919",
        padding: "0.5rem 1.5rem",
        borderRadius: "4px",
      },
    },
  },
});
const NavbarMenu = ({
  menuState,
  handleCity,
  handleCityReturn,
}: {
  menuState: any;
  handleCity: any;
  handleCityReturn: any;
}) => {
  const classes = useStyles();
  const level1 = useRef(null);
  const level2 = useRef(null);
  const level3 = useRef(null);
  const info = useRef(null);
  useEffect(() => {
    if (
      menuState.clicked === true ||
      (menuState.clicked === true && menuState.initial === null)
    ) {
      fadeInUp(info.current);
      staggerText(level1.current, level2.current, level3.current);
    }
  }, [menuState]);

  const fadeInUp = (node1: { node1: ReactNode }) => {
    gsap.from(node1, {
      y: 60,
      duration: 1,
      delay: 0.2,
      opacity: 0,
      ease: "power3.inOut",
    });
  };

  const staggerText = (
    node1: { node1: ReactNode },
    node2: { node2: ReactNode },
    node3: { node3: ReactNode }
  ) => {
    gsap.from([node1, node2, node3], {
      y: 100,
      duration: 0.8,
      delay: 0.1,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3,
      },
    });
  };

  const handleHover = (e: ChangeEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: "power1.inOut",
    });
  };

  const handleHoverExit = (e: ChangeEvent<HTMLInputElement>) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power1.inOut",
    });
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.menuLinks}>
        <nav>
          <ul>
            <li>
              <Link
                onMouseEnter={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHover(e)
                }
                onMouseOut={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHoverExit(e)
                }
                ref={level1}
                to="/all-products/category/saree"
              >
                Saree
              </Link>
            </li>
            <li>
              <Link
                onMouseEnter={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHover(e)
                }
                onMouseOut={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHoverExit(e)
                }
                ref={level2}
                to="/all-products/category/suit"
              >
                Suits
              </Link>
            </li>
            <li>
              <Link
                onMouseEnter={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHover(e)
                }
                onMouseOut={(e: ChangeEvent<HTMLInputElement>) =>
                  handleHoverExit(e)
                }
                ref={level3}
                to="/all-products/category/home-decor"
              >
                Home Decor
              </Link>
            </li>
          </ul>
        </nav>
        <div ref={info} className={classes.info}>
          <h3>Our Promise</h3>
          <p>
            Eternal Pehnawa is an exclusive store providing a wide range of
            Indian ethnic wear. EP act as a connector between customer and
            artisans & craftsmen from all over India at your doorsteps. It
            offers you to the most beautiful and handcrafted India’s heritage
            products from corners of India like Banarasi, Maheshwari, Chanderi,
            Handlooms, Cotton, Ikkat, Linen, Khadis, Tussar, Mursidabad,
            Kalamkari, Block print and more. We revolutionize fashion among all
            age group women at addictive prices and unbeatable quality. EP is
            customer centric with aim to provide best possible services to our
            customers and also welcome new ideas and suggestions from our
            customer so we can grow enough to meet customer expectations. HAPPY
            SHOPPING!
          </p>
        </div>
        <div className={classes.location}>
          Locations :
          <span
            onMouseEnter={() =>
              handleCity(
                "https://res.cloudinary.com/cryptomonthly/image/upload/v1643465092/eternal_pehnawa/india_sktoas.jpg"
              )
            }
            onMouseOut={() => handleCityReturn()}
          >
            India
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
