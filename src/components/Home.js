import { Col, Container, Row, Table, Progress } from 'reactstrap';

import ReactCountryFlag from "react-country-flag"
import { collection, getDocs, onSnapshot, updateDoc, doc } from '@firebase/firestore';
import { db } from '../firebase-config';


import { useEffect, useState } from 'react';


function Home() {
    const countries = [
        { country: 'Oman', code: 'OM' },
        { country: 'Russia', code: 'RU' },
        { country: 'Israel', code: 'IL' },
        { country: 'India', code: 'IN' },
        { country: 'Belgium', code: 'BE' },
        { country: 'Bosnia and Herzegovina', code: 'BA' },
        { country: 'Croatia', code: 'HR' },
        { country: 'United States of America', code: 'US' },
        { country: 'United Kingdom', code: 'GB' },
        { country: 'United Arab Emirates', code: 'AE' },
        { country: 'Saudi Arabia', code: 'SA' },
        { country: 'Italy', code: 'IT' },
        { country: 'Serbia', code: 'RS' },
        { country: 'Canada', code: 'CA' },
        { country: 'Brazil', code: 'BR' },
        { country: 'Kuwait', code: 'KW' },
        { country: 'France', code: 'FR' },
        { country: 'Bahrain', code: 'BH' }

    ];
    const [votingStart, setVotingStart] = useState(false)
    const [votes, setVotes] = useState([])
    const votesCollection = collection(db, 'votes')
    const voteStatusCollection = collection(db, "votingstatus")
    const showresultCollection = collection(db, 'showResult')
    const [showResult, setShowResult] = useState(false)
    const [totalVotes, setTotalVotes] = useState(0)
    const [maxVoteObj, setMaxVoteObj] = useState({})


    useEffect(() => {

        onSnapshot(voteStatusCollection, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setVotingStart((data[0].status !== 0) ? true : false)
        })

        onSnapshot(showresultCollection, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setShowResult(data[0].result)
        })

        const getVotingData = async () => {
            const records = await getDocs(votesCollection)
            const data = records.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setTotalVotes(data.reduce((a, b) => ({ vote: a.vote + b.vote })).vote)
            const final = []
            countries.map(item => {
                let res = data.filter(d => d.code === item.code)
                final.push({ code: item.code, country: item.country, vote: res.length })
            })
            setVotes([...final])

            const arr = {
                code: '',
                country: '',
                vote: -Infinity
            }
    
            final.forEach(item => {
                if (item.vote > arr.vote) {
                    arr.code = item.code;
                    arr.country = item.country;
                    arr.vote = item.vote;
                }
            })
            setMaxVoteObj(arr)
        }

        getVotingData()

        


    }, [])

    return (
        <Container className="p-3">
            {
                (votingStart && (
                    <h1 className="text-white">Voting in progress...</h1>
                ))
            }
            <Row xs="2">
                <Col>
                    <Table bordered className="text-white border-warning">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Countries
                                </th>
                                <th>
                                    Votes
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {votes.map((item, i) => {
                                if (i < 9) {
                                    if (item.code === maxVoteObj.code && showResult) {
                                        return (
                                            <tr key={i} className="highlight">
                                                <td style={{ width: '20px' }}>
                                                    {i + 1}
                                                </td>
                                                <td style={{ width: '300px' }}>
                                                    <ReactCountryFlag countryCode={item.code} svg /> {item.country}
                                                </td>
                                                <td style={{ width: '50px' }}>
                                                    {(!showResult) ? 0 : item.vote}
                                                </td>
                                                <td>
                                                    <Progress
                                                        value={(!showResult) ? 0 : item.vote / totalVotes * 100}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={i}>
                                                <td style={{ width: '20px' }}>
                                                    {i + 1}
                                                </td>
                                                <td style={{ width: '300px' }}>
                                                    <ReactCountryFlag countryCode={item.code} svg /> {item.country}
                                                </td>
                                                <td style={{ width: '50px' }}>
                                                    {(!showResult) ? 0 : item.vote}
                                                </td>
                                                <td>
                                                    <Progress
                                                        value={(!showResult) ? 0 : item.vote / totalVotes * 100}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                            }
                            )}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Table bordered className="text-white border-warning">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Countries
                                </th>
                                <th>
                                    Votes
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {votes.map((item, i) => {
                                if (i > 8) {
                                    return (
                                        <tr key={i}>
                                            <td style={{ width: '20px' }}>
                                                {i + 1}
                                            </td>
                                            <td style={{ width: '300px' }}>
                                                <ReactCountryFlag countryCode={item.code} svg /> {item.country}
                                            </td>
                                            <td style={{ width: '50px' }}>
                                                {(!showResult) ? 0 : item.vote}
                                            </td>
                                            <td>
                                                <Progress
                                                    value={(!showResult) ? 0 : item.vote / totalVotes * 100}
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
