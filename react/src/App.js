import React , {useState} from 'react'

export default function App() {
    const [img , setImage] = useState();
    const [video , setVideo] = useState();

    const uploadFileUsingCludinaryAPI = async (type)=>{
        try{
            const formData = new FormData();
        formData.append('file', type === "image" ? img : video);
        formData.append('upload_preset', type === "image" ? "Image_preset" : "Video_preset");
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${type}/upload`, {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        return data.secure_url;
        }catch(error){
            console.log(error.message);
        }
    }

    const uploadFileUsingNodeApi = async()=>{
        try{
            const formData = new FormData();
           formData.append('image', img);
           const res = await fetch(`http://localhost:8000`, {
            method: 'POST',
            body: formData
        })
        const data = await res.json();
        return data.data;
        }catch(error){
            console.log(error.message);
        }
    }

    const hanleSubmit = async(e) => {
        e.preventDefault();

        console.log("loading...");
        // let imageUrl =await uploadFileUsingCludinaryAPI("image");
        // let videoUrl = await uploadFileUsingCludinaryAPI("video");

        let imageUrl =await uploadFileUsingNodeApi();

        console.log(imageUrl);
        // console.log(videoUrl);
    }


  return (
    <div>
      <form onSubmit={hanleSubmit}>
        <div>
            <label htmlFor="Video">Video :</label>
            <br/>
            <input type="file" accept="video/*" id="Video" 
            onChange={(e)=>{
                setVideo(e.target.files[0])
            }}
            />
        </div>
        <br/>
        <div>
            <label htmlFor="img">Image :</label>
            <br/>
            <input type="file" accept="image/*" id="img" 
            onChange={(e)=>{
                setImage(e.target.files[0])
            }}
            />
        </div>

        <button type="submit">upload</button>
      </form>
    </div>
  )
}
