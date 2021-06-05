import React from "react";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    lightFont: {
        fontFamily: "Acumin Pro Light !important"
    },
    rightMargin: {
        marginRight: 10
    }
}));

const Breadcrumb = ({
    crumbs,
    customPageName = null,
    fontSize = 12,
    color = "#717273",
    currentPageColor = "#9d9e9e"
}) => {
    const classes = useStyles();

    return (
        <div style={{ fontSize }}>
            {crumbs.map(({ name, path }, index) =>
                index + 1 === crumbs.length ? (
                    <span
                        key={index}
                        className={classes.lightFont}
                        style={{ color: currentPageColor }}
                    >
                        {customPageName ? customPageName : name}
                    </span>
                ) : (
                    <span key={index}>
                        <Link
                            to={path}
                            style={{ color }}
                            className={`${classes.lightFont} ${classes.rightMargin}`}
                        >
                            {name}
                        </Link>
                        <ExpandMoreIcon
                            className={classes.rightMargin}
                            style={{
                                transform: "rotate(270deg)",
                                fill: color,
                                verticalAlign: "top",
                                fontSize: fontSize + 8
                            }}
                        />
                    </span>
                )
            )}
        </div>
    );
};

export default Breadcrumb;
