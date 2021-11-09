import {
  Account,
  Field,
  Item,
  ModelBlock,
  Plugin,
  PluginAttributes,
  Role,
  Site,
  SsoUser,
  Upload,
  User,
} from './SiteApiSchema';

// /** A menu item displayed inside a custom tab in the top-bar of the UI */
// export type MainNavigationTabItem = {
//   /** Label to be shown. Must be unique. */
//   label: string;
//   /** FontAwesome icon name to be shown alongside the label */
//   icon: string;
//   /** ID of the page linked to the tab */
//   pointsTo?: {
//     pageId: string;
//   };
// }

/** A tab to be displayed in the top-bar of the UI */
export type MainNavigationTab = {
  /** Label to be shown. Must be unique. */
  label: string;
  /** FontAwesome icon name to be shown alongside the label */
  icon: string;
  /** ID of the page linked to the tab */
  pointsTo?: {
    pageId: string;
  };
  /** Expresses where you want to place the tab in the top-bar. If not specified, the tab will be placed after the standard tabs provided by DatoCMS itself. */
  placement?: ['before' | 'after', 'content' | 'mediaArea' | 'apiExplorer' | 'settings'];
  /** If different plugins specify the same placement for their tab, they will be displayed by ascending `rank`. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;

  // FUTURE

  // /** The list of sub-items it contains **/
  // items?: MainNavigationTabItem[];
};

/** An item contained in a Settings Area group */
export type SettingsAreaSidebarItem = {
  /** Label to be shown. Must be unique. */
  label: string;
  /** FontAwesome icon name to be shown alongside the label */
  icon: string;
  /** ID of the page linked to the item */
  pointsTo?: {
    pageId: string;
  };
};

/**  The sidebar in the Settings Area presents a number of pages grouped by topic. This object represents a new group to be added in the sideebar to the standard ones DatoCMS provides. */
export type SettingsAreaSidebarItemGroup = {
  /** Label to be shown. Must be unique. */
  label: string;
  /** The list of items it contains **/
  items: SettingsAreaSidebarItem[];
  /** Expresses where you want the group to be placed inside the sidebar. If not specified, the item will be placed after the standard items provided by DatoCMS itself. */
  placement?: [
    'before' | 'after',
    (
      | 'environment'
      | 'project'
      | 'permissions'
      | 'webhooks'
      | 'deployment'
      | 'sso'
      | 'auditLog'
      | 'usage'
    ),
  ];
  /** If different plugins specify the same placement for their sections, they will be displayed by ascending `rank`. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;
};

// type ContentAreaSidebarItemChild = {
//   /** Label to be shown. Must be unique. */
//   label: string;
//   /** FontAwesome icon name to be shown alongside the label */
//   icon: string;
//   /** ID of the page linked to the item */
//   pointsTo?: {
//     pageId: string;
//   };
//   /** The list of sub-items it contains **/
//   items?: ContentAreaSidebarItemChild[];
// }

/**  The sidebar in the Content Area presents a number of user-defined menu-items. This object represents a new item to be added in the sidebar. */
export type ContentAreaSidebarItem = {
  /** Label to be shown. Must be unique. */
  label: string;
  /** FontAwesome icon name to be shown alongside the label */
  icon: string;
  /** ID of the page linked to the item */
  pointsTo?: {
    pageId: string;
  };
  /** Expresses where you want the item to be placed inside the sidebar. If not specified, the item will be placed after the standard items provided by DatoCMS itself. */
  placement?: ['before' | 'after', 'menuItems' | 'settings'];
  /** If different plugins specify the same placement for their sections, they will be displayed by ascending `rank`. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;

  // FUTURE

  // /** The list of sub-items it contains **/
  // items?: ContentAreaSidebarItemChild[];
};

export type FieldExtensionType = 'field_editor' | 'field_addon' | 'sidebar';

export type FieldExtension = {
  /** ID of FieldExtension */
  id: string;
  name: string;
  type: FieldExtensionType;
  fieldTypes: NonNullable<PluginAttributes['field_types']>;
  configurable: boolean;
  startOpen?: boolean;
  rank?: number;
  initialHeight?: number;
};

export type SidebarPane = {
  /** ID of SidebarPane */
  id: string;
  label: string;
  parameters: Record<string, unknown>;
  startOpen?: boolean;
  rank?: number;
  initialHeight?: number;
};

export type EditorOverride = {
  /** ID of EditorOverride */
  id: string;
  type: 'field_editor' | 'sidebar';
  parameters: Record<string, unknown>;
  startOpen?: boolean;
  rank?: number;
  initialHeight?: number;
};

export type AddonOverride = {
  /** ID of AddonOverride */
  id: string;
  parameters: Record<string, unknown>;
  rank?: number;
  initialHeight?: number;
};

export type FieldExtensionOverride = {
  editor?: EditorOverride;
  addons?: AddonOverride[];
};

export type Theme = {
  primaryColor: string;
  accentColor: string;
  semiTransparentAccentColor: string;
  lightColor: string;
  darkColor: string;
};

export type FocalPoint = {
  x: number;
  y: number;
};

export type FileFieldValue = {
  // eslint-disable-next-line camelcase
  upload_id: string;
  alt: string | null;
  title: string | null;
  // eslint-disable-next-line camelcase
  focal_point: FocalPoint | null;
  // eslint-disable-next-line camelcase
  custom_data: Record<string, string>;
};

export type Modal = {
  /** ID of Modal */
  id: string;
  title?: string;
  closeDisabled?: boolean;
  width?: 's' | 'm' | 'l' | 'xl' | 'fullWidth' | number;
  parameters: Record<string, unknown>;
  initialHeight?: number;
};

export type Toast<CtaValue = unknown> = {
  message: string;
  type: 'notice' | 'alert' | 'warning';
  cta?: {
    label: string;
    value: CtaValue;
  };
  dismissOnPageChange: boolean;
  dismissAfterTimeout: boolean | number;
};

export type ConfirmChoice = {
  label: string;
  value: unknown;
  intent?: 'positive' | 'negative';
};

export type ConfirmOptions = {
  title: string;
  content: string;
  choices: ConfirmChoice[];
  cancel: ConfirmChoice;
};

export type CommonMeta = {
  site: Site;
  environment: string;
  itemTypes: Partial<Record<string, ModelBlock>>;
  currentUser: User | SsoUser | Account;
  currentRole: Role;
  currentAccessToken: string;
  plugin: Plugin;
  ui: {
    locale: string;
  };
};

export type InitMetaAdditions = {
  mode: 'init';
};

export type InitMeta = CommonMeta & InitMetaAdditions;

export type InitMethods = {
  getSettings(): Promise<InitMeta>;
};

export type CommonRenderMetaAdditions = {
  fields: Partial<Record<string, Field>>;
  theme: Theme;
  users: Partial<Record<string, User>>;
  ssoUsers: Partial<Record<string, SsoUser>>;
  account: Account;
  plugin: Plugin;
};

export type CommonRenderMeta = CommonMeta & CommonRenderMetaAdditions;

export type CommonRenderMethods = {
  setHeight(number: number): void;
  navigateTo(path: string): void;
  loadItemTypeFields(itemTypeId: string): Promise<Field[]>;
  loadUsers(): Promise<User[]>;
  loadSsoUsers(): Promise<SsoUser[]>;
  createNewItem(itemTypeId: string): Promise<Item | null>;
  selectItem(
    itemTypeId: string,
    options: {
      multiple: true;
    },
  ): Promise<Item[] | null>;
  selectItem(
    itemTypeId: string,
    options?: {
      multiple: false;
    },
  ): Promise<Item | null>;
  editItem(itemId: string): Promise<Item | null>;
  alert(message: string): void;
  notice(message: string): void;
  customToast<CtaValue = unknown>(toast: Toast<CtaValue>): Promise<CtaValue | null>;
  selectUpload(options: { multiple: true }): Promise<Upload[] | null>;
  selectUpload(options?: { multiple: false }): Promise<Upload | null>;
  editUpload(uploadId: string): Promise<Upload | null>;
  editUploadMetadata(
    fileFieldValue: FileFieldValue,
    locale?: string,
  ): Promise<FileFieldValue | null>;
  openModal(modal: Modal): Promise<unknown>;
  openConfirm(options: ConfirmOptions): Promise<unknown>;
};

export type CommonRenderItemFormMetaAdditions = {
  locale: string;
  item: Item | null;
  itemType: ModelBlock;
  formValues: Record<string, unknown>;
  itemStatus: 'new' | 'draft' | 'updated' | 'published';
  isSubmitting: boolean;
  isFormDirty: boolean;
};

export type CommonRenderItemFormMeta = CommonRenderMeta & CommonRenderItemFormMetaAdditions;

export type CommonRenderItemFormMethodsAdditions = {
  toggleField(path: string, show: boolean): void;
  disableField(path: string, disable: boolean): void;
  scrollToField(path: string, locale?: string): void;
  setFieldValue(path: string, value: unknown): void;
  saveCurrentItem(): void;
};

export type CommonRenderItemFormMethods = CommonRenderMethods &
  CommonRenderItemFormMethodsAdditions;

export type RenderSidebarPaneMetaAdditions = {
  mode: 'renderSidebarPane';
  sidebarPaneId: string;
  parameters: Record<string, unknown>;
};

export type RenderSidebarPaneMeta = CommonRenderItemFormMeta & RenderSidebarPaneMetaAdditions;

export type RenderSidebarPaneMethodsAdditions = {
  getSettings(): Promise<RenderSidebarPaneMeta>;
};

export type RenderSidebarPaneMethods = CommonRenderItemFormMethods &
  RenderSidebarPaneMethodsAdditions;

export type RenderFieldExtensionMetaAdditions = {
  mode: 'renderFieldExtension';
  fieldExtensionId: string;
  parameters: Record<string, unknown>;
  placeholder: string;
  disabled: boolean;
  fieldPath: string;
  field: Field;
  parentField: Field | undefined;
};

export type RenderFieldExtensionMeta = CommonRenderItemFormMeta & RenderFieldExtensionMetaAdditions;

export type RenderFieldExtensionMethodsAdditions = {
  getSettings(): Promise<RenderFieldExtensionMeta>;
};

export type RenderFieldExtensionMethods = CommonRenderItemFormMethods &
  RenderFieldExtensionMethodsAdditions;

export type RenderModalMetaAdditions = {
  mode: 'renderModal';
  modalId: string;
  parameters: Record<string, unknown>;
};

export type RenderModalMeta = CommonRenderMeta & RenderModalMetaAdditions;

export type RenderModalMethodsAdditions = {
  getSettings(): Promise<RenderModalMeta>;
  resolve(returnValue: unknown): void;
};

export type RenderModalMethods = CommonRenderMethods & RenderModalMethodsAdditions;

export type RenderPageMetaAdditions = {
  mode: 'renderPage';
  pageId: string;
};

export type RenderPageMeta = CommonRenderMeta & RenderPageMetaAdditions;

export type RenderPageMethodsAdditions = {
  getSettings(): Promise<RenderPageMeta>;
};

export type RenderPageMethods = CommonRenderMethods & RenderPageMethodsAdditions;

export type RenderManualFieldExtensionParametersFormMetaAdditions = {
  mode: 'renderManualFieldExtensionParametersForm';
  fieldExtensionId: string;
  parameters: Record<string, unknown>;
  errors: Record<string, unknown>;
};

export type RenderManualFieldExtensionParametersFormMeta = CommonRenderMeta &
  RenderManualFieldExtensionParametersFormMetaAdditions;

export type RenderManualFieldExtensionParametersFormMethodsAdditions = {
  getSettings(): Promise<RenderManualFieldExtensionParametersFormMeta>;
  setParameters(params: Record<string, unknown>): Promise<void>;
};

export type RenderManualFieldExtensionParametersFormMethods = CommonRenderMethods &
  RenderManualFieldExtensionParametersFormMethodsAdditions;

export type RenderPluginParametersFormMetaAdditions = {
  mode: 'renderPluginParametersForm';
};

export type RenderPluginParametersFormMeta = CommonRenderMeta &
  RenderPluginParametersFormMetaAdditions;

export type RenderPluginParametersFormMethodsAdditions = {
  getSettings(): Promise<RenderPluginParametersFormMeta>;
  save(params: Record<string, unknown>): Promise<void>;
};

export type RenderPluginParametersFormMethods = CommonRenderMethods &
  RenderPluginParametersFormMethodsAdditions;

export type FieldSetupMetaAdditions = {
  mode: 'init';
  itemType: ModelBlock;
};

export type FieldSetupMeta = InitMeta & FieldSetupMetaAdditions;
