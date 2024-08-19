## uplod video or Image on Cloudinary

### api
```js
 post  https://api.cloudinary.com/v1_1/{$CouldName}/${type}/upload

 body : formData
```
cloudName is show in cloudinary dashboard
type  like image , video 

1. create upload_preset
2. create fromData
```js
  const formData = new FormData();
        formData.append('file', img);
        formData.append('upload_preset',"Image_preset");
```
