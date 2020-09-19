import React, {useCallback, useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {useDropzone} from 'react-dropzone'
import { useCookies } from 'react-cookie';
import '../styles/ImageUpload.css'
import '../styles/Common.css';

const ImageUpload = (props) => {
    const {challenge} = props;
    const [image, setImage] = useState({});
    const [loading, setLoading] = useState(false)
    const [imageUpload, setImageUpload] = useState({});
    const [cookie, setCookie] = useCookies(['isah_id']);

    const onDrop = useCallback(acceptedFiles => {
        setImage(acceptedFiles[0])
    }, []);

    const getPresignedUrl = (file) => {
        var data = {
            'challengeId': props.challenge.id,
            'fileName' : file.name,
            'fileType': file.type
        }
        axios.post('/image/upload', data, {headers: {'Authorization': cookie.isah_id}})
            .then(response => {
                setImageUpload(response.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    useEffect(() => {
        if (Object.keys(image).length !== 0) {
            getPresignedUrl(image)
        }
    }, [image])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    });

    const submitChallenge = () => {
        setLoading(true)
        var data = {
            'challengeId': challenge.id,
            'uploadedFileKey': imageUpload.key
        }
        axios.post('/submit', data, {headers: {'Authorization': cookie.isah_id}})
            .then(response => {
                props.onUpload(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    const uploadImage = () => {
        var blob = image.slice(0, image.size, image.type);
        var renameFile = new File([blob], imageUpload.key, { type: image.type });
        let req = new XMLHttpRequest();
        req.open("PUT", imageUpload.url);
        req.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            console.log("File Uploaded")
            submitChallenge()
          }
        }
        req.send(renameFile);
    }

    return (
        <>
            <div className='row justify-content-md-center description-box'>
                <div className='col-sm-12 col-md-6'>
                    {Object.keys(image).length === 0? 
                        <div {...getRootProps()} className='dropbox'>
                            <input {...getInputProps()} />
                            {
                                isDragActive ? 
                                <div className='drag-text'>Drop image here</div> :
                                <div className='drag-text'>Drag 'n' drop image here, or click to select a file</div>
                            }
                        </div> :
                        <div className='image-preview'>
                            <img src={URL.createObjectURL(image)} width='50%' className='image-preview' alt='Upload'/>
                        </div>
                    }
                </div>
            </div>
            {loading ? 
                <div className='row justify-content-md-center description-box'>
                    <div className='col-sm-12 col-md-6 text-center'>
                        <ReactLoading type={'bubbles'} color={'#000000'} height={'20%'} width={'20%'} className='loading' />
                    </div>
                </div> : null
            }
            <div className='row justify-content-md-center description-box'>
                <div className='col-sm-12 col-md-6 text-center'>
                    {loading ? 
                    <button className='button-rounded-black-disabled text-large' disabled>Uploading</button>:
                    Object.keys(imageUpload).length === 0? 
                        <button className='button-rounded-black-disabled text-large' disabled>Upload</button>:
                        <button className='button-rounded-black text-large' onClick={uploadImage}>Upload</button>
                    }
                </div>
            </div>
        </>
    )
}

export default ImageUpload;