import { useEffect, useState } from "react"
import axios from "axios";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function TrafficImagesPage() {

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
    const [data, setData] = useState<any>([]);

    useEffect(() => {

        (async () => {
            const request = await axios.get('https://api.data.gov.sg/v1/transport/traffic-images', {})
            // console.log(request.data.items[0].cameras)
            setData(request.data.items[0].cameras)
        })();

        setInterval(() => {
            (async () => {
                const request = await axios.get('https://api.data.gov.sg/v1/transport/traffic-images', {})
                // console.log(request.data.items[0].cameras)
                setData(request.data.items[0].cameras)
            })();
        }, 60000)




    }, [])

    return (
        <>
            <Grid
                h='200px'
                // templateRows='repeat(2, 1fr)'
                templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
                gap={4}
                p={2}
            >
                {data.map((camera: {
                    camera_id: string;
                    image: string | undefined;
                }) => {
                    return (
                        <GridItem colSpan={1}>
                            <Box>
                                <img src={camera.image} ></img>
                                {camera.camera_id}
                            </Box>
                        </GridItem>
                    )
                })}
            </Grid>

        </>
    )
}
