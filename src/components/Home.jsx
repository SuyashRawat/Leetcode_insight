import React, { useContext, useEffect, useState } from "react";
import leetcodedata from "../state/context";
import "../styles/Home.css";
import Contestdetails from "./Contestdetails";
import Solved from "./solved";
import Submission from "./Submission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const context = useContext(leetcodedata);
    const { fetchUserData, Contestdata, userdata, userBadges, potd } = context;
    const [userRating, setuserRating] = useState(0.0);

    useEffect(() => {
        fetchUserData();
        const rating = Contestdata.contestRating;
        const formattedRating =
            rating !== undefined && rating !== null
                ? parseFloat(rating.toFixed(0))
                : null;
        setuserRating(formattedRating);
    }, []);

    const Badge = ({ badge }) => (
        <div key={badge.id}>
            <img
                src={
                    badge.displayName === "Knight"
                        ? "https://pic.leetcode-cn.com/1605256144-mculET-Knight.gif"
                        : badge.icon
                }
                alt={badge.displayName}
                style={{ width: "50px", height: "50px" }}
            />
            <p>{badge.displayName}</p>
            <p>Creation Date: {badge.creationDate}</p>
        </div>
    );

    const UpcomingBadge = ({ upcomingBadge }) => (
        <div key={upcomingBadge.name}>
            <img
                src={upcomingBadge.icon}
                alt={upcomingBadge.name}
                style={{ width: "50px", height: "50px" }}
            />
            <p>{upcomingBadge.name}</p>
        </div>
    );

    const POTDComponent = ({ data }) => {
        if (!data) {
            return <div>No POTD data available</div>;
        }
        const {
            questionLink,
            date,
            questionId,
            questionFrontendId,
            questionTitle,
            titleSlug,
            difficulty,
            isPaidOnly,
            question,
            exampleTestcases,
            topicTags,
            hints,
            solution,
            companyTagStats,
            likes,
            dislikes,
            similarQuestions,
        } = data;

        return (
            <div>
            <div style={{ fontSize: '1.5rem' }}>Haven't solved the POTD yet? Click below to check it out</div>
            <div style={{ margin: '1vw' }}><a href={questionLink} target="_blank" rel="noopener noreferrer"><h5>{questionTitle}</h5></a></div>
            <div style={{ fontSize: '1rem' }}>Difficulty: {difficulty}</div>
        </div>
        );
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    width: "100vw",
                    marginTop:'2vw'
                }}
            >
                {/* First Div (20vw) */}
                <div
                    className="firstdiv box card"
                    style={{
                        width: "34vw",
                        height: "60vh",
                        backgroundColor: "lightdark",
                        margin: "3vw 2vw 0vw 1vw",
                        boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.3, 0.8)",
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(to bottom, #333, #000)",
                    }}
                >
                    <ul className="list-group list-group-flush">
                        <img
                            src={userdata.avatar!=="https://assets.leetcode.com/users/avatars/avatar_1704517319.png" ?
                         userdata.avatar : "https://leetcode.com/static/images/LeetCode_logo_rvs.png"} 
                            alt="User Photo"
                            style={{
                                position: "absolute", 
                                top: "-0.2vh", 
                                left: "-0.2vw", 
                                width: "6vw", 
                                height: "13vh", 
                                borderRadius: "0% 0% 20% 0%", 
                                border: "0.2vw white solid",
                                objectFit: "cover",
                            }}
                        />
                        <h4 className="user" style={{ marginLeft: "6%" }}>
                            {userdata.username}
                        </h4>
                        <p>{userdata.about}</p>
                        <p>DOB: {userdata.birthday}</p>
                        <p>Rating: {userRating}</p>

                        <POTDComponent data={potd} />

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <FontAwesomeIcon
                                    className=""
                                    size="2x"
                                    style={{ cursor: "pointer", marginRight: "1vw" }}
                                    icon={faGithubAlt}
                                />
                                <FontAwesomeIcon
                                    className=""
                                    size="2x"
                                    style={{ cursor: "pointer" }}
                                    icon={faLinkedinIn}
                                />
                            </div>
                        </div>
                    </ul>
                </div>
                <div style={{ alignItems: "center" }}>
                    <Solved />
                </div>
                <div
                    className="box card"
                    style={{
                        width: "34vw",
                        height: "60vh",
                        backgroundColor: "lightdark",
                        margin: "3vw 2vw 1vw 0vw",
                        boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.3, 0.8)",
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(to bottom, #333, #000)",
                        color: "white",
                    }}
                >
                    <div style={{ overflowY: "scroll" }}>
                        <h3>BADGES</h3>
                        {userBadges ? (
                            <>
                                <h5>Count: {userBadges.badgesCount}</h5>

                                <h5>Badges:</h5>
                                <div>
                                    {userBadges.badges
                                        ? userBadges.badges.map((badge) => (
                                              <Badge key={badge.id} badge={badge} />
                                          ))
                                        : null}
                                </div>

                                <h5>Upcoming Badges:</h5>
                                <div>
                                    {userBadges.upcomingBadges
                                        ? userBadges.upcomingBadges.map((upcomingBadge) => (
                                              <UpcomingBadge
                                                  key={upcomingBadge.name}
                                                  upcomingBadge={upcomingBadge}
                                              />
                                          ))
                                        : null}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            <div
                className="d-flex"
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <Contestdetails />
            </div>
            <div
                className="d-flex"
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <Submission />
            </div>
        </>
    );
};

export default Home;
