import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AssetService } from './services/asset.service';
import { GameDescriptorService } from './services/game-descriptor.service';
import { SceneService } from './services/scene.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgSrc: string;

  constructor(private sceneService : SceneService, private assetService: AssetService, private gameDescriptorService: GameDescriptorService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.gameDescriptorService.observeState(gameDescriptor => {
      console.log(gameDescriptor);
      this.imgSrc = this.assetService.getAssetUrl('images/homer1.png');
      this.cdRef.detectChanges();
    });
  }
}
