import { Image } from 'phosphor-react';
import React,{useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Text from '../Text';

interface DropzoneProps {
    onFileUploaded : (file : File) => void;
}

export default function Dropzone({onFileUploaded} : DropzoneProps) {
    const [selectedFileURL, setSelectedFileURL] = useState("")
    const onDrop = useCallback((acceptedFiles : any[]) => {
      const file = acceptedFiles[0];
      const fileURL = URL.createObjectURL(file);

      setSelectedFileURL(fileURL)
      onFileUploaded(file)


    }, [onFileUploaded]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div className='flex flex-row MT-4'{...getRootProps()}>
        <input {...getInputProps()} />
        {
          selectedFileURL ? (
            <img src={selectedFileURL} alt="foto do post" className='max-h-96'/> ) : (
          <p className='flex items-center gap-2'>
             <Image size={48} weight="thin"/>
             <Text><a href="#">Clique e arraste a imagem ou clique aqui para selecionar</a></Text>
          </p>
        )}
      </div>
    )
  }