import FragmentShaderDesert from "@/shaders/desert.frag";
import VertexShaderDesert from "@/shaders/desert.vert";

import FragmentShaderSnowy from "@/shaders/snowy.frag";
import VertexShaderSnowy from "@/shaders/snowy.vert";


export const datas = {
    desert: {
        title: 'Desert Memories',
        fragment: FragmentShaderDesert,
        vertex: VertexShaderDesert,
        images: [
            {
                src: 'desert1.jpg'
            },
            {
                src: 'desert2.jpg'
            },
            {
                src: 'desert3.jpg'
            },
            {
                src: 'desert4.jpg'
            },
            {
                src: 'desert5.jpg'
            },
            {
                src: 'desert6.jpg'
            },
            {
                src: 'desert7.jpg'
            },
            {
                src: 'desert8.jpg'
            },
            {
                src: 'desert9.jpg'
            },
            {
                src: 'desert10.jpg'
            },
        ]
    },
    snowy: {
        title: 'Snowy Memories',
        fragment: FragmentShaderSnowy,
        vertex: VertexShaderSnowy,
        images: [
            {
                src: 'snowy1.jpeg'
            },
            {
                src: 'snowy2.jpeg'
            },
            {
                src: 'snowy3.jpeg'
            },
            {
                src: 'snowy4.jpeg'
            },
            {
                src: 'snowy5.jpeg'
            },
            {
                src: 'snowy6.jpeg'
            },
            {
                src: 'snowy7.jpeg'
            },
            {
                src: 'snowy8.jpeg'
            },
            {
                src: 'snowy9.jpeg'
            },
            {
                src: 'snowy10.jpeg'
            },
        ]
    }
}