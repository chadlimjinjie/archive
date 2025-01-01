'use client'

import { Box, Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'
import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import numberBlockOne from "@/../public/One.png"

import {
  NumberInput,
  NumberInputField
} from '@chakra-ui/react'

export default function Page() {

  const [questions, setQuestions] = useState([
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPYoBHXsTec4l408GCnUuhzLcSuOMh6ZjlZATeC9xCe55bgaUGyvUb88EDT0Rz8JfUS4A&usqp=CAU",
      answer: 1
    }, {
      image: "https://static.wikia.nocookie.net/numberblocks/images/9/9c/One.png/revision/latest?cb=20210322110748",
      answer: 1
    }
  ])

  const [question, setQuestion] = useState(
    {
      image: numberBlockOne,
      answer: "1"
    }
  )

  async function submitAnswer(values: any, actions: any) {

    let answer: string = values.answer

    console.log(answer)
    console.log(question.answer)

    if (answer != question.answer) {
      console.log("Wrong")
      actions.setErrors({ answer: "Wrong answer" })
      return
    }

    console.log("Correct")

    // return res.data

  }

  let initialFormValues = { answer: '' }

  return (
    <Container maxW='container.auto' p={'4'}>
      <Container centerContent>
        {/* <Image src={question.image} mb={4} /> */}
        <Box mb={4} w='100px' h='100px'>
          <Image src={numberBlockOne} alt='' />
        </Box>
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          onSubmit={(values, actions) => {
            submitAnswer(values, actions)

            setTimeout(() => {
              actions.setSubmitting(false)

            }, 1000)
            actions.setValues(initialFormValues)
          }}
        >
          {(props) => (
            <Form>
              <Field name='answer'>
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.answer && form.touched.answer} mb={4}>
                    <FormLabel>Answer</FormLabel>
                    <NumberInput>
                      <NumberInputField {...field} placeholder='Answer' />
                      {/* <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper> */}
                    </NumberInput>
                    <FormErrorMessage>{form.errors.answer}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
              {/* <Button onClick={() => props.resetForm({values:initialFormValues})}>
                Reset
              </Button> */}
            </Form>
          )}
        </Formik>
      </Container>
    </Container >
  )
}