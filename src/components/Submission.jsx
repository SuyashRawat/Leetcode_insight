import React, { useEffect, useContext, useState } from 'react';
import leetcodedata from '../state/context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Submission = () => {
    const context = useContext(leetcodedata);
    const { useracSubmissiondata, userSubmissiondata } = context;
    const [Question, setQuestion] = useState([]);
    const [Questiondata, setQuestiondata] = useState(userSubmissiondata);

    const storeQuestion = () => {
        if (Array.isArray(Questiondata.submission)) {
            for (let submission of Questiondata.submission) {
                setQuestion((prevacQuestion) => {
                    // if (!prevacQuestion.includes(submission.title)) {
                    return [...prevacQuestion, { title: submission.title, status: submission.statusDisplay }];
                    // }
                    // return prevacQuestion;
                });
            }
        }
    };

    const handleSubmission = () => {
        if (Questiondata === userSubmissiondata) {
            console.log("click1");
            setQuestion([]);
            setQuestiondata(useracSubmissiondata);
        } else {
            console.log("click2");
            setQuestion([]);
            setQuestiondata(userSubmissiondata);
        }
        console.log(Questiondata)
        storeQuestion();
    };
    const handelquestion=(name)=>{
        const naam = name.toLowerCase().replace(/\s+/g, '-');
        window.open(`https://leetcode.com/problems/${naam}/`, '_blank');
    }
    useEffect(() => {
        setQuestion([]);
        storeQuestion();
    }, [Questiondata]);

    const cardStyles = {
        width: '70vw',
        height: 'fit-content',
        background: 'linear-gradient(to bottom, #333, #000)',
        color: '#fff',
        boxShadow: '0 4px 8px rgba(0.1, 0.1, 0.3, 0.8)',
        borderRadius: '8px',
        margin: '3vw 3vw 0vw 0vw',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    };

    const containerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'right',
    };

    const itemStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #fff',
        borderRadius: '4px',
        margin: '4px',
        padding: '8px',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
    };

    const itemHoverStyles = {
        backgroundColor: '#555',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    return (
        <>
            <div className="card" style={cardStyles}>
                <div className="card-header">
                    <h5>Previous Submission</h5>
                </div>
                <div className="card-body">
                    <div style={containerStyles}>
                        <p>Question</p>
                        <p>Status</p>
                    </div>
                    <div>
                        {Question.map((item, index) => (
                            <div
                                key={index}
                                style={{ ...itemStyles, ...(index % 2 === 0 ? itemHoverStyles : null) }}
                            >
                                <a onClick={()=>{handelquestion(item.title)}}>{item.title}</a>
                                <div>
                                    {item.status === "Accepted" && <FontAwesomeIcon className='text-success' style={{fontSize:'1.3rem'}} icon={faCheck} />}
                                    {item.status !== "Accepted" && <FontAwesomeIcon  className='text-danger' style={{fontSize:'1.3rem'}} icon={faCircleXmark} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-footer text-body-secondary">
                    {Questiondata === userSubmissiondata && <a onClick={handleSubmission} className='btn btn-primary'>Ac Submission</a>}
                    {Questiondata !== userSubmissiondata && <a onClick={handleSubmission} className='btn btn-primary'>All Submissions</a>}
                </div>
            </div>
        </>
    );
};

export default Submission;