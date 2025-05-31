// src/app/features/dashboard/home/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
// import { GroupSettingsService } from '../../configuracoes/group-settings/group-settings.service'; // Crie este serviço
// Interface para os dados do grupo
// export interface GroupInfo {
//   nome: string;
//   fotoUrl?: string; // URL da foto do grupo
// }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // private groupSettingsService = inject(GroupSettingsService); // Futuro
  groupPhotoUrl: string | null = null; // 'assets/placeholder-group-bg.jpg'; // Placeholder
  groupName: string = 'Grupo Escoteiro X'; // Placeholder

  ngOnInit(): void {
    // No futuro, carregar a foto do grupo e o nome das configurações
    // this.groupSettingsService.getGroupInfo().subscribe(info => {
    //   if (info) {
    //     this.groupName = info.nome;
    //     this.groupPhotoUrl = info.fotoUrl || 'assets/placeholder-group-bg.jpg';
    //   }
    // });
    // Por enquanto, um placeholder. Crie uma imagem em assets/images/default-group-bg.jpg
    this.groupPhotoUrl = 'assets/images/default-group-bg.jpg';
  }
}
