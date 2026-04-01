import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ThemePreset = 'midnight' | 'minimal' | 'sunset';
type AddOptionType = 'link' | 'product' | 'dm';

type SocialPlatform =
  | 'instagram'
  | 'whatsapp'
  | 'mail'
  | 'youtube'
  | 'linkedin'
  | 'telegram'
  | 'facebook'
  | 'x'
  | 'snapchat'
  | 'pinterest';

type ThemeConfig = {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
};

type SocialOption = {
  platform: SocialPlatform;
  label: string;
};

type SocialBlock = {
  type: 'social';
  platform: SocialPlatform;
  username: string;
  profileUrl: string;
  isEnabled: boolean;
};

type LinkBlock = {
  type: 'link';
  title: string;
  url: string;
};

type ProductBlock = {
  type: 'product';
  productName: string;
  buyUrl: string;
};

type DmBlock = {
  type: 'dm';
  keyword: string;
  message: string;
};

type PageBlock = LinkBlock | ProductBlock | DmBlock | SocialBlock;

@Component({
  selector: 'app-bio-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bio-page.html',
  styleUrls: ['./bio-page.css']
})
export class BioPageComponent implements OnInit, OnDestroy {
  userSlug = 'sachinn77';
  bioText = '';
  profilePreviewUrl = '';

  themeConfig: ThemeConfig = {
    backgroundColor: 'linear-gradient(135deg, #0b1020 0%, #1e3a8a 58%, #4338ca 100%)',
    textColor: '#ffffff',
    buttonColor: '#ffffff'
  };

  selectedTheme: ThemePreset = 'midnight';
  themeSettingsOpen = false;

  blocks: PageBlock[] = [];

  showAddModal = false;
  showLinkPopup = false;
  showProductPopup = false;
  showDmPopup = false;
  showSocialPopup = false;
  showSocialManagerPopup = false;

  addSearch = '';
  editingBlockIndex: number | null = null;
  returnToSocialManager = false;

  readonly socialOptions: SocialOption[] = [
    { platform: 'instagram', label: 'Instagram' },
    { platform: 'whatsapp', label: 'WhatsApp' },
    { platform: 'mail', label: 'Email' },
    { platform: 'youtube', label: 'YouTube' },
    { platform: 'linkedin', label: 'LinkedIn' },
    { platform: 'telegram', label: 'Telegram' },
    { platform: 'facebook', label: 'Facebook' },
    { platform: 'x', label: 'X' },
    { platform: 'snapchat', label: 'Snapchat' },
    { platform: 'pinterest', label: 'Pinterest' }
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }

  private updateBodyScrollLock(): void {
    const open =
      this.showAddModal ||
      this.showLinkPopup ||
      this.showProductPopup ||
      this.showDmPopup ||
      this.showSocialPopup ||
      this.showSocialManagerPopup;

    document.body.classList.toggle('modal-open', open);
  }

  get addOptions() {
    return [
      {
        type: 'link' as AddOptionType,
        title: 'Link',
        desc: 'Add website, YouTube, store, or any external URL',
        chip: 'Popular',
        colorClass: 'blue'
      },
      {
        type: 'product' as AddOptionType,
        title: 'Product',
        desc: 'Add product name and link',
        chip: 'Sell',
        colorClass: 'orange'
      },
      {
        type: 'dm' as AddOptionType,
        title: 'DM Trigger',
        desc: 'Auto reply with a message when users send a keyword',
        chip: 'Automation',
        colorClass: 'purple'
      }
    ];
  }

  get filteredAddOptions() {
    const term = this.addSearch.trim().toLowerCase();

    if (!term) {
      return this.addOptions;
    }

    return this.addOptions.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.desc.toLowerCase().includes(term) ||
        item.chip.toLowerCase().includes(term)
    );
  }

  get activePreviewSocials(): SocialBlock[] {
    return this.blocks.filter(
      (block): block is SocialBlock =>
        block.type === 'social' && block.isEnabled && this.isSocialPreviewReady(block)
    );
  }

  get addedSocialRows(): Array<SocialOption & { block: SocialBlock }> {
    return this.socialOptions
      .map((item) => ({
        ...item,
        block: this.getSocialBlock(item.platform)
      }))
      .filter((row): row is SocialOption & { block: SocialBlock } => !!row.block);
  }

  get suggestedSocialOptions(): SocialOption[] {
    return this.socialOptions.filter((item) => !this.hasSocial(item.platform));
  }

  get previewLinkBlocks(): (LinkBlock | ProductBlock)[] {
    return this.blocks.filter(
      (block): block is LinkBlock | ProductBlock =>
        (block.type === 'link' && !!block.title.trim() && !!block.url.trim()) ||
        (block.type === 'product' &&
          !!block.productName.trim() &&
          !!block.buyUrl.trim())
    );
  }

  get editingLinkBlock(): LinkBlock | null {
    if (this.editingBlockIndex === null) return null;
    const block = this.blocks[this.editingBlockIndex];
    return block?.type === 'link' ? block : null;
  }

  get editingProductBlock(): ProductBlock | null {
    if (this.editingBlockIndex === null) return null;
    const block = this.blocks[this.editingBlockIndex];
    return block?.type === 'product' ? block : null;
  }

  get editingDmBlock(): DmBlock | null {
    if (this.editingBlockIndex === null) return null;
    const block = this.blocks[this.editingBlockIndex];
    return block?.type === 'dm' ? block : null;
  }

  get editingSocialBlock(): SocialBlock | null {
    if (this.editingBlockIndex === null) return null;
    const block = this.blocks[this.editingBlockIndex];
    return block?.type === 'social' ? block : null;
  }

  get socialPrimaryLabel(): string {
    if (!this.editingSocialBlock) return 'Username';

    switch (this.editingSocialBlock.platform) {
      case 'whatsapp':
        return 'Name';
      case 'mail':
        return 'Email';
      default:
        return 'Username';
    }
  }

  get socialPrimaryPlaceholder(): string {
    if (!this.editingSocialBlock) return '@username';

    switch (this.editingSocialBlock.platform) {
      case 'whatsapp':
        return 'Enter name';
      case 'mail':
        return 'Enter email address';
      default:
        return '@username';
    }
  }

  get socialSecondaryLabel(): string {
    if (!this.editingSocialBlock) return 'Profile URL';
    return this.editingSocialBlock.platform === 'whatsapp' ? 'Phone Number' : 'Profile URL';
  }

  get socialSecondaryPlaceholder(): string {
    if (!this.editingSocialBlock) return 'https://profile-link.com';

    switch (this.editingSocialBlock.platform) {
      case 'whatsapp':
        return '+919876543210';
      case 'instagram':
        return 'https://instagram.com/username';
      case 'youtube':
        return 'https://youtube.com/@channel';
      case 'linkedin':
        return 'https://linkedin.com/in/username';
      case 'telegram':
        return 'https://t.me/username';
      case 'facebook':
        return 'https://facebook.com/username';
      case 'x':
        return 'https://x.com/username';
      case 'snapchat':
        return 'https://snapchat.com/add/username';
      case 'pinterest':
        return 'https://pinterest.com/username';
      default:
        return 'https://profile-link.com';
    }
  }

  getSocialLabel(platform: SocialPlatform): string {
    return this.socialOptions.find((x) => x.platform === platform)?.label || platform;
  }

  getSocialBlock(platform: SocialPlatform): SocialBlock | null {
    const found = this.blocks.find(
      (block) => block.type === 'social' && block.platform === platform
    );
    return found && found.type === 'social' ? found : null;
  }

  hasSocial(platform: SocialPlatform): boolean {
    return !!this.getSocialBlock(platform);
  }

  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  toggleThemeSettings(preset: ThemePreset): void {
    if (this.selectedTheme === preset) {
      this.themeSettingsOpen = !this.themeSettingsOpen;
    } else {
      this.selectedTheme = preset;
      this.themeSettingsOpen = true;
    }
    this.applyThemePreset(preset);
  }

  applyThemePreset(preset: ThemePreset): void {
    this.selectedTheme = preset;

    if (preset === 'midnight') {
      this.themeConfig = {
        backgroundColor: 'linear-gradient(135deg, #0b1020 0%, #1e3a8a 58%, #4338ca 100%)',
        textColor: '#ffffff',
        buttonColor: '#ffffff'
      };
      return;
    }

    if (preset === 'minimal') {
      this.themeConfig = {
        backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        textColor: '#0f172a',
        buttonColor: '#ffffff'
      };
      return;
    }

    this.themeConfig = {
      backgroundColor: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)',
      textColor: '#ffffff',
      buttonColor: '#ffffff'
    };
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.addSearch = '';
    this.updateBodyScrollLock();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.updateBodyScrollLock();
  }

  openSocialManager(): void {
    this.showSocialManagerPopup = true;
    this.updateBodyScrollLock();
  }

  closeSocialManager(): void {
    this.showSocialManagerPopup = false;
    this.updateBodyScrollLock();
  }

  handleAddOption(type: AddOptionType): void {
    if (type === 'link') return this.openLinkPopup();
    if (type === 'product') return this.openProductPopup();
    this.openDmPopup();
  }

  openOrEditSocial(platform: SocialPlatform, fromManager = false): void {
    const index = this.blocks.findIndex(
      (block) => block.type === 'social' && block.platform === platform
    );

    this.returnToSocialManager = fromManager;

    if (index !== -1) {
      this.openSocialPopup(platform, index, fromManager);
      return;
    }

    this.openSocialPopup(platform, undefined, fromManager);
  }

  selectSuggestedSocial(platform: SocialPlatform): void {
    this.openOrEditSocial(platform, true);
  }

  toggleSocialFromManager(platform: SocialPlatform): void {
    const block = this.getSocialBlock(platform);

    if (!block) {
      this.openOrEditSocial(platform, true);
      return;
    }

    if (!block.isEnabled) {
      if (!this.isSocialPreviewReady(block)) {
        this.openOrEditSocial(platform, true);
        return;
      }
      block.isEnabled = true;
      return;
    }

    block.isEnabled = false;
  }

  moveSocialUp(platform: SocialPlatform): void {
    const socials = this.blocks.filter((b): b is SocialBlock => b.type === 'social');
    const socialIndex = socials.findIndex((s) => s.platform === platform);
    if (socialIndex <= 0) return;

    const current = socials[socialIndex];
    const previous = socials[socialIndex - 1];

    const currentIndexInBlocks = this.blocks.findIndex(
      (b) => b.type === 'social' && b.platform === current.platform
    );
    const previousIndexInBlocks = this.blocks.findIndex(
      (b) => b.type === 'social' && b.platform === previous.platform
    );

    [this.blocks[currentIndexInBlocks], this.blocks[previousIndexInBlocks]] =
      [this.blocks[previousIndexInBlocks], this.blocks[currentIndexInBlocks]];
  }

  moveSocialDown(platform: SocialPlatform): void {
    const socials = this.blocks.filter((b): b is SocialBlock => b.type === 'social');
    const socialIndex = socials.findIndex((s) => s.platform === platform);
    if (socialIndex === -1 || socialIndex >= socials.length - 1) return;

    const current = socials[socialIndex];
    const next = socials[socialIndex + 1];

    const currentIndexInBlocks = this.blocks.findIndex(
      (b) => b.type === 'social' && b.platform === current.platform
    );
    const nextIndexInBlocks = this.blocks.findIndex(
      (b) => b.type === 'social' && b.platform === next.platform
    );

    [this.blocks[currentIndexInBlocks], this.blocks[nextIndexInBlocks]] =
      [this.blocks[nextIndexInBlocks], this.blocks[currentIndexInBlocks]];
  }

  openLinkPopup(index?: number): void {
    if (typeof index === 'number') {
      this.editingBlockIndex = index;
    } else {
      this.blocks.push({ type: 'link', title: '', url: '' });
      this.editingBlockIndex = this.blocks.length - 1;
    }

    this.showLinkPopup = true;
    this.showAddModal = false;
    this.updateBodyScrollLock();
  }

  openProductPopup(index?: number): void {
    if (typeof index === 'number') {
      this.editingBlockIndex = index;
    } else {
      this.blocks.push({ type: 'product', productName: '', buyUrl: '' });
      this.editingBlockIndex = this.blocks.length - 1;
    }

    this.showProductPopup = true;
    this.showAddModal = false;
    this.updateBodyScrollLock();
  }

  openDmPopup(index?: number): void {
    if (typeof index === 'number') {
      this.editingBlockIndex = index;
    } else {
      this.blocks.push({ type: 'dm', keyword: '', message: '' });
      this.editingBlockIndex = this.blocks.length - 1;
    }

    this.showDmPopup = true;
    this.showAddModal = false;
    this.updateBodyScrollLock();
  }

  openSocialPopup(platform: SocialPlatform, index?: number, fromManager = false): void {
    this.returnToSocialManager = fromManager;

    if (typeof index === 'number') {
      this.editingBlockIndex = index;
    } else {
      this.blocks.push({
        type: 'social',
        platform,
        username: '',
        profileUrl: platform === 'whatsapp' ? '+91' : '',
        isEnabled: false
      });
      this.editingBlockIndex = this.blocks.length - 1;
    }

    this.showSocialPopup = true;
    this.showSocialManagerPopup = false;
    this.updateBodyScrollLock();
  }

  private closeAllEditors(): void {
    this.showLinkPopup = false;
    this.showProductPopup = false;
    this.showDmPopup = false;
    this.showSocialPopup = false;
    this.editingBlockIndex = null;
  }

  cancelEditor(): void {
    if (this.editingBlockIndex !== null) {
      const block = this.blocks[this.editingBlockIndex];

      if (
        (block.type === 'link' && !block.title.trim() && !block.url.trim()) ||
        (block.type === 'product' && !block.productName.trim() && !block.buyUrl.trim()) ||
        (block.type === 'dm' && !block.keyword.trim() && !block.message.trim()) ||
        (block.type === 'social' &&
          !block.username.trim() &&
          (!block.profileUrl.trim() || block.profileUrl.trim() === '+91'))
      ) {
        this.blocks.splice(this.editingBlockIndex, 1);
      }
    }

    const goBackToManager = this.returnToSocialManager;
    this.closeAllEditors();
    this.returnToSocialManager = false;

    if (goBackToManager) {
      this.showSocialManagerPopup = true;
    }

    this.updateBodyScrollLock();
  }

  saveEditor(): void {
    if (this.editingBlockIndex === null) return;

    const block = this.blocks[this.editingBlockIndex];

    if (block.type === 'link' && this.isLinkBlockInvalid(block)) {
      alert('Please enter a valid title and URL.');
      return;
    }

    if (block.type === 'product' && this.isProductBlockInvalid(block)) {
      alert('Please enter product name and valid link.');
      return;
    }

    if (block.type === 'dm' && this.isDMBlockInvalid(block)) {
      alert('Please enter keyword and message.');
      return;
    }

    if (block.type === 'social') {
      if (this.isSocialBlockInvalid(block)) {
        if (block.platform === 'mail') {
          alert('Please enter a valid email address.');
        } else if (block.platform === 'whatsapp') {
          alert('Please enter name and phone number in +91 format.');
        } else {
          alert('Please enter username and valid profile URL.');
        }
        return;
      }
      block.isEnabled = true;
    }

    const goBackToManager = this.returnToSocialManager;
    this.closeAllEditors();
    this.returnToSocialManager = false;

    if (goBackToManager) {
      this.showSocialManagerPopup = true;
    }

    this.updateBodyScrollLock();
  }

  editBlock(index: number): void {
    const block = this.blocks[index];

    if (block.type === 'link') return this.openLinkPopup(index);
    if (block.type === 'product') return this.openProductPopup(index);
    if (block.type === 'dm') return this.openDmPopup(index);
    this.openSocialPopup(block.platform, index, false);
  }

  removeBlock(index: number): void {
    this.blocks.splice(index, 1);
  }

  private isValidUrl(url: string): boolean {
    return /^(https?:\/\/).+/i.test((url || '').trim());
  }

  isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim());
  }

  isIndianPhone(value: string): boolean {
    return /^\+91\d{10}$/.test((value || '').trim());
  }

  isLinkBlockInvalid(block: PageBlock | null): boolean {
    return !!block && block.type === 'link' && (!block.title.trim() || !this.isValidUrl(block.url));
  }

  isProductBlockInvalid(block: PageBlock | null): boolean {
    return !!block && block.type === 'product' && (!block.productName.trim() || !this.isValidUrl(block.buyUrl));
  }

  isDMBlockInvalid(block: PageBlock | null): boolean {
    return !!block && block.type === 'dm' && (!block.keyword.trim() || !block.message.trim());
  }

  isSocialBlockInvalid(block: PageBlock | null): boolean {
    if (!block || block.type !== 'social') return false;

    if (block.platform === 'mail') {
      return !block.username.trim() || !this.isEmail(block.username);
    }

    if (block.platform === 'whatsapp') {
      return !block.username.trim() || !this.isIndianPhone(block.profileUrl);
    }

    return !block.username.trim() || !this.isValidUrl(block.profileUrl);
  }

  isSocialPreviewReady(block: SocialBlock): boolean {
    if (block.platform === 'mail') {
      return !!block.username.trim() && this.isEmail(block.username);
    }

    if (block.platform === 'whatsapp') {
      return !!block.username.trim() && this.isIndianPhone(block.profileUrl);
    }

    return !!block.username.trim() && !!block.profileUrl.trim();
  }

  getSocialHref(social: SocialBlock): string {
    if (social.platform === 'mail') {
      return `mailto:${social.username.trim()}`;
    }

    if (social.platform === 'whatsapp') {
      return `https://wa.me/${social.profileUrl.replace('+', '').trim()}`;
    }

    return social.profileUrl.trim();
  }

  getPreviewBlockHref(block: LinkBlock | ProductBlock): string {
    return block.type === 'product' ? block.buyUrl : block.url;
  }
}