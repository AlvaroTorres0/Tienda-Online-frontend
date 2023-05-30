import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureServiceService {
  public containerClient(sas: string, container : string) : ContainerClient {
    return new BlobServiceClient(`https://tiendaonline.blob.core.windows.net/?${sas}`)
            .getContainerClient(container);
  }

  public uploadImage(sas : string, content: Blob, name: string, container : string, handler: () => void) {
    const url = this.uploadBlob(content, name, this.containerClient(sas, container), handler)
    return url;
  }


  public uploadBlob(content: Blob, name: string, client: ContainerClient, handler: () => void) {
    let blockBlobClient = client.getBlockBlobClient(name);
    blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler());
    
    return blockBlobClient.url;
  }

  constructor() { }
}
