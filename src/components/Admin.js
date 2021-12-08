import { Col, Container, Row, Button, Table, Progress } from 'reactstrap';

import ReactCountryFlag from "react-country-flag"
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, updateDoc, doc } from '@firebase/firestore';
import { db } from '../firebase-config';



function Admin() {
    const [votingStart, setVotingStart] = useState(false)
    const [votes, setVotes] = useState([])
    const votesCollection = collection(db, 'votes')
    const voteStatusCollection = collection(db, "votingstatus")
    const showresultCollection = collection(db, 'showResult')
    const [totalVotes, setTotalVotes] = useState(0)
    const [voteStatusID, setVoteStatusID] = useState('')
    const [showResult, setShowResult] = useState(false)

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

    const startVoting = async () => {
        console.log('a')
        setVotingStart(true)

        const statusDoc = doc(db, "votingstatus", voteStatusID)
        const newField = { status: 1 }
        await updateDoc(statusDoc, newField)


    }

    const endVoting = async () => {
        console.log('b')
        setVotingStart(false)

        const statusDoc = doc(db, "votingstatus", voteStatusID)
        const newField = { status: 0 }
        await updateDoc(statusDoc, newField)
    }

    const handleShowResult = async () => {
        const record = await getDocs(showresultCollection)
        const id = record.docs.map(doc => doc.id)
        const showResultDoc = doc(db, "showResult", id[0])
        const newField = { result: !showResult }
        setShowResult(!showResult)
        await updateDoc(showResultDoc, newField)
    }


    useEffect(() => {
        onSnapshot(votesCollection, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            if (data.length > 0) {
                setTotalVotes(data.reduce((a, b) => ({ vote: a.vote + b.vote })).vote)
                const final = []
                countries.map(item => {
                    let res = data.filter(d => d.code === item.code)
                    if(item.code === 'BH') {
                        final.push({ code: item.code, country: item.country, vote: res.length -1 })
                    } else {
                        final.push({ code: item.code, country: item.country, vote: res.length })
                    }
                })
                setVotes([...final])
            }
        })

        const getVoteStatusID = async () => {
            const record = await getDocs(voteStatusCollection)
            const id = record.docs.map(doc => doc.id)
            setVoteStatusID(id[0])
        }

        getVoteStatusID()

    }, [])

    return (
        <Container className="p-3">
            <Row >
                <Col>
                    <div className="d-flex mb-3 justify-content-around">
                        <Button disabled={votingStart} color="primary" className="w-25" onClick={startVoting}>
                            Start Voting
                        </Button>
                        <Button disabled={!votingStart} className="w-25 btn-secondary" onClick={endVoting}>
                            End Voting
                        </Button>
                        <Button className="w-25 btn-success" onClick={handleShowResult}>
                            Show Results
                        </Button>
                    </div>
                </Col>
            </Row>
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
                                    return (
                                        <tr key={i}>
                                            <td style={{ width: '20px' }}>
                                                {i + 1}
                                            </td>
                                            <td style={{ width: '300px' }}>
                                                <ReactCountryFlag countryCode={item.code} svg /> {item.country}
                                            </td>
                                            <td style={{ width: '50px' }}>
                                                {item.vote}
                                            </td>
                                            <td>
                                                <Progress
                                                    value={item.vote / totalVotes * 100}
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
                                                {item.vote}
                                            </td>
                                            <td>
                                                <Progress
                                                    value={item.vote / totalVotes * 100}
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

export default Admin
