import { Result } from './../../../common/response/result';
import { Exception } from './../../../common/response/Exception';
import { CoreAssert } from './../../../common/utils/assert';
import { IGalleryRepository } from "../../../domain/image/abstract/persistance/iGalleryRepository";
import { IGetImages } from "../../../domain/image/abstract/usecase/iGetImages";
import { Image } from "../../../domain/image/entity/image";
import { ImageUseCaseDTO } from "../../../domain/image/usecase/dto/imageUseCaseDTO";
import { GetImagesUseCase } from "../../../domain/image/usecase/getImagesUseCase";

export class GetImagesService implements GetImagesUseCase {

    /**
    * @param {IGalleryRepository} iGalleryRepository is a repository for gallery which is a collection of images 
    */
    constructor(
        private readonly iGalleryRepository: IGalleryRepository
    ) { }

    public async execute(payload: IGetImages): Promise<ImageUseCaseDTO[]> {

        const images: Image[] = await this.iGalleryRepository.findImages();

        CoreAssert.notEmpty(images, Exception.new({ resultDescription: Result.ENTITY_NOT_FOUND_ERROR, overrideMessage: "No images found" }));

        return ImageUseCaseDTO.newListFromImages(images);
    }
}