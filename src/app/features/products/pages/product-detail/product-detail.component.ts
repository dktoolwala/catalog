/**
 * Product Detail Page (Smart Component)
 *
 * Displays a single product's full information.
 * Product is loaded by the resolver before this component renders.
 * Reads state from ProductStateService.
 *
 * Provides:
 *   - Product image gallery (first image for now)
 *   - Name, description, category, price
 *   - WhatsApp contact button
 *   - Back to products navigation
 */

import { Component, ChangeDetectionStrategy, inject, type OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';

import { WHATSAPP } from '../../../../core/constants';
import { CurrencyFormatPipe } from '../../../../shared/pipes';
import { EmptyStateComponent } from '../../../../shared/components';
import { ProductFacade } from '../../application';
import { ProductImageComponent } from '../../components/product-image/product-image.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatChip,
    CurrencyFormatPipe,
    EmptyStateComponent,
    ProductImageComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnDestroy {
  protected readonly state = inject(ProductFacade);
  private readonly location = inject(Location);

  ngOnDestroy(): void {
    this.state.clearSelectedProduct();
  }

  protected goBack(): void {
    this.location.back();
  }

  protected getWhatsAppUrl(phone: string, productName: string): string {
    const message = encodeURIComponent(`Hi, I'm interested in: ${productName}`);
    const number = phone.replace(/\D/g, '');
    return `${WHATSAPP.BASE_URL}${number}?text=${message}`;
  }
}
