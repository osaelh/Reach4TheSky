import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props{
    uploadPhoto: (file: Blob) => void;
    uploading: boolean
}

export default function PhotoUploadWidget({uploadPhoto, uploading}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    
    function onCrop() {
        if(cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header subheader color='teal' content='Step 1 - Add Photo'/>
                <PhotoWidgetDropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
                <Header subheader color='teal' content='Step 2 - Resize Photo'/>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                )}
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={4}>
                <Header subheader color='teal' content='Step 3 - Preview and upload Photo'/>
                {files && files.length > 0 &&
                <>
                   <div className='img-preview' style={{minHeight : 200, overflow : 'hidden'}}></div>
                   <ButtonGroup widths={2}>
                       <Button loading={uploading} onClick={onCrop} positive icon='check'/>
                       <Button disabled={uploading} onClick={() => setFiles([])} icon='close'/>
                   </ButtonGroup>
                </>}
            </Grid.Column>
        </Grid>
    )
}