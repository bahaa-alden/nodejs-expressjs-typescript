import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';
import { BadRequestError } from '../../core/ApiError';
import { env_vars } from '../../config';

class CloudinaryService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: env_vars.cloudinary.cloud_name,
      api_key: env_vars.cloudinary.api_key,
      api_secret: env_vars.cloudinary.api_secret,
    });
  }

  // Convert buffer to readable stream
  bufferToStream(buffer: Buffer): Readable {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null); // End the stream
    return readable;
  }

  async uploadPhoto(buffer: Buffer): Promise<cloudinary.UploadApiResponse> {
    try {
      const result = await new Promise<cloudinary.UploadApiResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: 'Ubay' },
            (error, result) => {
              if (error) {
                reject(new BadRequestError(`Upload failed: ${error.message}`));
              } else {
                resolve(result as cloudinary.UploadApiResponse);
              }
            },
          );
          const stream = this.bufferToStream(buffer);
          stream.pipe(uploadStream);
        },
      );
      return result;
    } catch (err: any) {
      throw new Error(`Upload failed: ${err.message}`);
    }
  }

  async uploadSinglePhoto(buffer: Buffer) {
    const result = await this.uploadPhoto(buffer);
    return result.url;
  }

  async uploadMultiplePhotos(buffers: Buffer[]) {
    const results = await Promise.all(buffers.map((e) => this.uploadPhoto(e)));
    return results.map((res) => res.url);
  }

  async removePhoto(publicId: string) {
    return await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',
    });
  }

  async removeMultiplePhotos(publicIds: string[]) {
    return await Promise.all(
      publicIds.map(async (p) => await this.removePhoto(p)),
    );
  }
}

export const cloudinaryService = new CloudinaryService();
