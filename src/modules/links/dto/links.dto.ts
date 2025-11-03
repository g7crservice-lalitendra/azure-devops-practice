/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { messageFactory, messages } from 'src/shared/messages.shared';

/**
 * DTO for creating a new Link
 */
export class CreateLinkDto {
  @ApiProperty({ description: 'Display name of the link' })
  @IsNotEmpty({ message: messageFactory(messages.W2, ['Link name']) })
  @IsString({ message: messageFactory(messages.W1, ['Link name']) })
  readonly name: string;

  @ApiProperty({ description: 'Start timestamp of the link validity' })
  @IsNotEmpty({ message: messageFactory(messages.W2, ['Start timestamp']) })
  @IsNumber({}, { message: messageFactory(messages.W1, ['Start timestamp']) })
  readonly start_ts: number;

  @ApiProperty({ description: 'End timestamp of the link validity' })
  @IsNotEmpty({ message: messageFactory(messages.W2, ['End timestamp']) })
  @IsNumber({}, { message: messageFactory(messages.W1, ['End timestamp']) })
  readonly end_ts: number;

  @ApiProperty({ description: 'Reference user ID (Mongo ObjectId)' })
  @IsNotEmpty({ message: messageFactory(messages.W2, ['Reference user ID']) })
  @IsMongoId({ message: messageFactory(messages.W1, ['Reference user ID']) })
  readonly ref_uid: string;

  @ApiPropertyOptional({ description: 'Created at timestamp' })
  @IsOptional()
  @IsNumber({}, { message: messageFactory(messages.W1, ['Created timestamp']) })
  readonly created_at?: number;

  @ApiPropertyOptional({ description: 'Updated at timestamp' })
  @IsOptional()
  @IsNumber({}, { message: messageFactory(messages.W1, ['Updated timestamp']) })
  readonly updated_at?: number;
}

/**
 * DTO for updating an existing Link
 */
export class UpdateLinkDto {
  @ApiPropertyOptional({ description: 'Display name of the link' })
  @IsOptional()
  @IsString({ message: messageFactory(messages.W1, ['Link name']) })
  readonly name?: string;

  @ApiPropertyOptional({ description: 'Start timestamp of the link validity' })
  @IsOptional()
  @IsNumber({}, { message: messageFactory(messages.W1, ['Start timestamp']) })
  readonly start_ts?: number;

  @ApiPropertyOptional({ description: 'End timestamp of the link validity' })
  @IsOptional()
  @IsNumber({}, { message: messageFactory(messages.W1, ['End timestamp']) })
  readonly end_ts?: number;

  @ApiPropertyOptional({ description: 'Reference user ID (Mongo ObjectId)' })
  @IsOptional()
  @IsMongoId({ message: messageFactory(messages.W1, ['Reference user ID']) })
  readonly ref_uid?: string;

  @ApiPropertyOptional({ description: 'Updated timestamp' })
  @IsOptional()
  @IsNumber({}, { message: messageFactory(messages.W1, ['Updated timestamp']) })
  readonly updated_at?: number;
}

/**
 * DTO for Link Response
 */
export class LinkResponseDto {
  @ApiProperty({ description: 'Unique link identifier' })
  readonly _id: string;

  @ApiProperty({ description: 'Display name of the link' })
  readonly name: string;

  @ApiProperty({ description: 'Start timestamp' })
  readonly start_ts: number;

  @ApiProperty({ description: 'End timestamp' })
  readonly end_ts: number;

  @ApiProperty({ description: 'Reference user ID' })
  readonly ref_uid: string;

  @ApiProperty({ description: 'Creation timestamp' })
  readonly created_at: number;

  @ApiProperty({ description: 'Update timestamp' })
  readonly updated_at: number;
}
