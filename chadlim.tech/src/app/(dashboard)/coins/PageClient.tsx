"use client";
import axios from 'axios';
import { Box, Button, Card, CardBody, Image, Text, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

export function PageClient() {


    const [thirdPartyCoinGrader, setThirdPartyCoinGrader] = useState('');
    const [coinData, setCoinData] = useState<any>({});

    function validateCertNo(value: any) {
        let error;
        const regexPcgs = /^[\d]{7,8}$/;
        const regexNgc = /^[\d]{7}-[\d]{3}|[\d]{10}$/;

        if (!value) {
            error = 'Cert no is required';
        } else if (regexPcgs.test(value)) {
            setThirdPartyCoinGrader('pcgs');
            console.log('pcgs');
        } else if (regexNgc.test(value)) {
            setThirdPartyCoinGrader('ngc');
            console.log('ngc');
        } else {
            error = "Not a valid PCGS or NGC certificate";
        }
        return error;
    }


    async function getData(values: any) {

        let res: any;
        let certNo: string = values.certNo;
        let coinData: any = {};

        if (thirdPartyCoinGrader === 'pcgs') {
            res = await axios.post(`https://fastapi.chadlim1.repl.co/api/v1/coins/`, {
                service: "pcgs",
                certNo
            }, {
                headers: {
                    Authorization: "Bearer h4X8gKUhODcNsPvO5EfnjnlpXw2Fm3TciuGvfxIH4wC8ntjYCdpk1sLRcm8Yaee5C3nFDSurLEvSRgPn5dQEv0tjUy-yFlrgnvFb6UUdUxtSL4ksCk9xo87oOP2B2tN_xzT1LE5LJjJD3HkaAPXQOLvutXVQtHdDb4QhOtT0yfZCyfP8I4sZmFMLC9LMkFEm7uVLdJ0eTxo5ZijAPXdXeU5vbSAUJgnnqyce83-b_tUmpkjSK-uLE7vphdcOPie_UgqhIuiTJE5AdLD-Nfo5hHdll7ZKmZrMKP7vASc-gpuM4__p"
                }
            });
            // The return value is *not* serialized
            // You can return Date, Map, Set, etc.
            if (!res) {
                // This will activate the closest `error.js` Error Boundary
                console.log('Error');
                throw new Error('Failed to fetch data');
            }

            coinData = res.data;
            console.log(coinData);

            setCoinData(coinData);


        } if (thirdPartyCoinGrader === 'ngc') {
        }


        // return res.data
    }

    return (

        <Box>

            {coinData.name ? (

                <Container centerContent>
                    <Card maxW='sm' mb={4}>
                        <CardBody>
                            {coinData.image ? (
                                <Image
                                    src={coinData.image}
                                    alt={`${coinData.country} ${coinData.name}`}
                                    borderRadius='lg'
                                    mb='6' />
                            ) : null}

                            <Stack spacing='3'>
                                <Heading size='md'>{`${coinData.country} ${coinData.name}`}</Heading>
                                <Text>
                                    {coinData.summary}
                                </Text>

                            </Stack>
                        </CardBody>
                    </Card>
                </Container>
            ) : null}




            <Formik
                initialValues={{ certNo: '' }}
                onSubmit={(values, actions) => {
                    getData(values);
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <Form>
                        <Field name='certNo' validate={validateCertNo}>
                            {({ field, form }: any) => (
                                <FormControl isInvalid={form.errors.certNo && form.touched.certNo} mb={4}>
                                    <FormLabel>Cert Number</FormLabel>
                                    <Input {...field} placeholder='Cert No' />
                                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                    <FormErrorMessage>{form.errors.certNo}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>

        </Box>


    );
}
