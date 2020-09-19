import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../styles/Common.css';
import '../styles/ImageUpload.css'

const ImageShare = (props) => {
    const {challenge, user} = props;
    const [imageDownload, setImageDownload] = useState({});
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true)
    const [cookie, setCookie] = useCookies(['isah_id']);

    useEffect(() => {
        var completedChallenge = user.challengesCompleted.find(compChal => compChal.challengeId === challenge.id)
        var data = {
            'key': completedChallenge.achievementImageKey
        }
        axios.post('/image/download', data, {headers: {'Authorization': cookie.isah_id}})
            .then(response => setImageDownload(response.data))
            .catch(err => console.log(err))
    }, [challenge, user])

    useEffect(() => {
        if (imageDownload.url !== undefined && imageDownload.url !== null) {
            setLoading(true);
            fetch(imageDownload.url)
            .then(response => response.blob())
            .then(blob => {
                let file = new File([blob], 'download.jpeg', { type: "image/jpeg" });
                setImage(file)
                setLoading(false)
            })
        }
    }, [imageDownload])

    const share = () => {
        if (navigator.canShare && navigator.canShare({ files: [image] })) {
            navigator.share({
              files: [image],
              text: 'I nominate you to complete this challenge. https://istayathome.in/challenge/' + challenge.id
            })
            .then(() => console.log('Share was successful.'))
            .catch((error) => downloadImage());
          } else {
            downloadImage();
          }
    }

    const downloadImage = () => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = window.URL.createObjectURL(image);
        a.download = 'download.jpeg';
        a.click();
    }

    return (
        <>
            <div className='row justify-content-md-center description-box'>
                <div className='col-sm-12 col-md-6'>
                    <div className='image-preview'>
                        {image ? 
                        <img src={window.URL.createObjectURL(image)} width='50%' className='image-preview' alt='Challenge Completed'/>
                        : null}
                    </div>
                </div>
            </div>
            <div className='row justify-content-md-center description-box'>
                <div className='col-sm-12 col-md-6 text-center'>
                    {loading? 
                        <ReactLoading type={'bubbles'} color={'#000000'} height={'20%'} width={'20%'} className='loading' />:
                        <button className='button-rounded-black text-large' onClick={share}>Share</button>
                    }
                </div>
            </div>
        </>
    )
}

export default ImageShare;