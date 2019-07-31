import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  profileForm: FormGroup;
  constructor(public navCtrl: NavController, private camera: Camera) {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', Validators.required)
    });
  }

  image: any = ''
  takePhoto() {
      const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert("error " + JSON.stringify(err))
    });

  }

  //To fetch the full form details.
  getProfileFormValue() {
    return this.profileForm.value
  }

  //To fetch the individual form value:
  getName(){
     return this.profileForm.controls['name'].value
  }

  getEmail(){
    return this.profileForm.controls['email'].value
  }

  getPhoneNumber(){
    return this.profileForm.controls['phonenumber'].value
  }

  //This method will validate if the details filled are valid.
  submit() {
    if (this.profileForm.valid) {
      alert("Successfully submitted");
    } else {
      alert("Please fill the required details");
    }
  }
}
