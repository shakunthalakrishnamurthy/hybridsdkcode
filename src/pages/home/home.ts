import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  profileForm: FormGroup;
  constructor(public navCtrl: NavController, private camera: Camera,private androidPermissions: AndroidPermissions) {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', Validators.required)
    });
  }


  image: any = ''
  openCam() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
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

  submit() {
    if (this.profileForm.valid) {
      alert("Successfully submitted");
    } else {
      alert("Please fill the required details");
    }
  }
}
