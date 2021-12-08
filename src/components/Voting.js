import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from 'reactstrap';

import ReactCountryFlag from "react-country-flag"

import swal from 'sweetalert'
import { useState } from 'react';

import {db} from './../firebase-config'
import { collection, addDoc  } from 'firebase/firestore'



function Voting() {
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
    const [select, setSelect] = useState([])

    const votesCollection = collection(db, "votes")

    const submitForm = (e) => {
        e.preventDefault()
        if (select.length !== 3) {
            swal('You have to select 3 countries..')
            return
        } 

        if (select.length === 3) {
            swal({
                title: "You want to submit?",
                icon: "warning",
                buttons: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        select.map(item => {
                            addDoc(votesCollection, {code: item.code, country: item.country, vote: 1}).then(res => {
                                window.location.reload()
                            })
                        })
                    } 
                });
        }
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            setSelect([...select, ...countries.filter(item => item.code === e.target.value)])
        } 
        
        if(!e.target.checked) {
            setSelect([...select.filter(item => item.code !== e.target.value)])
        }
    }

    const handleReset = (e) => {
        window.location.reload()
    }

  


    return (
        <Container className="p-3">
            <Form onSubmit={submitForm} onReset={handleReset}>
                <Row xs="2">
                    {
                        countries.map((country, i) => (
                            <Col key={i} className="text-white border p-2">
                                <FormGroup
                                    check
                                    inline
                                >
                                    <Label check>
                                        <Input type="checkbox" onChange={handleChange} value={country.code} />
                                        <ReactCountryFlag countryCode={country.code} svg />
                                        {" " + country.country}
                                    </Label>
                                </FormGroup>
                            </Col>
                        ))
                    }
                </Row>

                <Row >
                    <Col>
                        <div className="d-flex mt-5 justify-content-around">
                            <Button color="primary" className="w-25" type="reset">
                                Reset
                            </Button>
                            <Button color="primary" className="w-25" type="submit">
                                Submit
                            </Button>
                            
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Voting
