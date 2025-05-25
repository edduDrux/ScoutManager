import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  groupPhotoUrl: string = 'https://via.placeholder.com/1920x1080'; // Placeholder inicial

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    // Buscar a foto do grupo no Firestore
    const groupRef = doc(this.firestore, 'groups', 'groupId'); // Substitua 'groupId' pelo ID do grupo
    const groupSnap = await getDoc(groupRef);
    if (groupSnap.exists()) {
      this.groupPhotoUrl = groupSnap.data()['photoUrl'] || this.groupPhotoUrl;
    }
  }
}
