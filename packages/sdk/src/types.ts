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

/** Field extensions extend the basic functionality of DatoCMS when it comes to presenting record's fields to the final editor. Depending on the extension type (`field_editor`, `field_addon` or `sidebar`) they will be shown in different places of the interface. */
export type FieldExtension = {
  /** ID of field extension. Will be the first argument for the `renderFieldExtension` function */
  id: string;
  /** Name to be shown when editing fields */
  name: string;
  /**
   * Type of field extension.
   *
   * * `field_editor` extensions replace the default field editor that DatoCMS provides
   * * `field_addon` extensions are placed underneath the field editor to provide additional info/behaviour. You can setup multiple field addons for every field
   * * `sidebar` extensions move the field on the sidebar of the record editing page
   **/
  type: FieldExtensionType;
  /** The type of fields that the field extension in compatible with */
  fieldTypes: NonNullable<PluginAttributes['field_types']>;
  /** Whether this field extension needs some configuration options before being installed in a field or not. Will trigger the `renderManualFieldExtensionParametersForm` and `validateManualFieldExtensionParameters` methods */
  configurable: boolean;
  /** For `sidebar` extensions only: whether the sidebar pane will start open or collapsed */
  startOpen?: boolean;
  /** For `sidebar` and `field_addon` extensions only: if multiple field extensions are present for a field, they will be sorted by ascending `rank`. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;
  /** The initial height to set for the iframe that will render the field extension */
  initialHeight?: number;
};

/** A sidebar pane to be shown inside the record's editing page */
export type SidebarPane = {
  /** ID of the pane. Will be the first argument for the `renderSidebarPane` function */
  id: string;
  /** Label to be shown on the collapsible sidebar pane handle */
  label: string;
  /** An arbitrary configuration object that will be passed as the `parameters` property of the second argument of the `renderSidebarPane` function */
  parameters: Record<string, unknown>;
  /** Whether the sidebar pane will start open or collapsed */
  startOpen?: boolean;
  /** If multiple sidebar panes are present, they will be sorted by ascending `rank`. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;
  /** The initial height to set for the iframe that will render the sidebar pane */
  initialHeight?: number;
};

/** A field editor/sidebar forced on a field */
export type EditorOverride = {
  /** ID of field extension. Will be the first argument for the `renderFieldExtension` function */
  id: string;
  /**
   * Type of field extension.
   *
   * * `field_editor` extensions replace the default field editor that DatoCMS provides
   * * `sidebar` extensions move the field on the sidebar of the record editing page
   **/
  type: 'field_editor' | 'sidebar';
  /** An arbitrary configuration object that will be passed as the `parameters` property of the second argument of the `renderFieldExtension` function */
  parameters: Record<string, unknown>;
  /** For `sidebar` extensions only: whether the sidebar pane will start open or collapsed */
  startOpen?: boolean;
  /** If multiple plugins ovverride a field, the one with the highest `rank` will win. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;
  /** The initial height to set for the iframe that will render the field extension */
  initialHeight?: number;
};

/** A field addon extension forced on a field */
export type AddonOverride = {
  /** ID of field extension. Will be the first argument for the `renderFieldExtension` function */
  id: string;
  /** An arbitrary configuration object that will be passed as the `parameters` property of the second argument of the `renderFieldExtension` function */
  parameters: Record<string, unknown>;
  /** If multiple addons are present for a field, they will be sorted by ascending `rank`. If you want to specify an explicit value for `rank`, make sure to offer a way for final users to customize it inside the plugin's settings form, otherwise the hardcoded value you choose might clash with the one of another plugin! **/
  rank?: number;
  /** The initial height to set for the iframe that will render the field extension */
  initialHeight?: number;
};

/** An object expressing some field extensions you want to force on a particular field */
export type FieldExtensionOverride = {
  /** Force a field editor/sidebar extension on a field */
  editor?: EditorOverride;
  /** One or more field sidebar extensions to forcefully add to a field */
  addons?: AddonOverride[];
};

/** An object containing the theme colors for the current DatoCMS project */
export type Theme = {
  primaryColor: string;
  accentColor: string;
  semiTransparentAccentColor: string;
  lightColor: string;
  darkColor: string;
};

/** Focal point of an image asset */
export type FocalPoint = {
  /** Horizontal position expressed as float between 0 and 1 */
  x: number;
  /** Vertical position expressed as float between 0 and 1 */
  y: number;
};

/** The structure contained in a "single asset" field */
export type FileFieldValue = {
  /** ID of the asset */
  // eslint-disable-next-line camelcase
  upload_id: string;
  /** Alternate text for the asset */
  alt: string | null;
  /** Title for the asset */
  title: string | null;
  /** Focal point of an asset */
  // eslint-disable-next-line camelcase
  focal_point: FocalPoint | null;
  /** Object with arbitrary metadata related to the asset */
  // eslint-disable-next-line camelcase
  custom_data: Record<string, string>;
};

/** A modal to present to the user */
export type Modal = {
  /** ID of the modal. Will be the first argument for the `renderModal` function */
  id: string;
  /** Title for the modal. Ignored by `fullWidth` modals */
  title?: string;
  /** Whether to present a close button for the modal or not */
  closeDisabled?: boolean;
  /** Width of the modal. Can be a number, or one of the predefined sizes */
  width?: 's' | 'm' | 'l' | 'xl' | 'fullWidth' | number;
  /** An arbitrary configuration object that will be passed as the `parameters` property of the second argument of the `renderModal` function */
  parameters: Record<string, unknown>;
  /** The initial height to set for the iframe that will render the modal content */
  initialHeight?: number;
};

/** A toast notification to present to the user */
export type Toast<CtaValue = unknown> = {
  /** Message of the notification */
  message: string;
  /** Type of notification.  Will present the toast in a different color accent. */
  type: 'notice' | 'alert' | 'warning';
  /** An optional button to show inside the toast */
  cta?: {
    /** Label for the button */
    label: string;
    /** The value to be returned by the `customToast` promise if the button is clicked by the user */
    value: CtaValue;
  };
  /** Whether the toast is to be automatically closed if the user changes page */
  dismissOnPageChange?: boolean;
  /** Whether the toast is to be automatically closed after some time (`true` will use the default DatoCMS time interval) */
  dismissAfterTimeout?: boolean | number;
};

/** A choice presented in a `openConfirm` pane */
export type ConfirmChoice = {
  /** The label to be shown for the choice */
  label: string;
  /** The value to be returned by the `openConfirm` promise if the button is clicked by the user */
  value: unknown;
  /** The intent of the button. Will present the button in a different color accent. */
  intent?: 'positive' | 'negative';
};

/** Options for the `openConfirm` function */
export type ConfirmOptions = {
  /** The title to be shown inside the confirmation pane */
  title: string;
  /** The main message to be shown inside the confirmation pane */
  content: string;
  /** The different options the user can choose from */
  choices: ConfirmChoice[];
  /** The cancel option to present to the user */
  cancel: ConfirmChoice;
};

export type CommonMeta = {
  /** The current DatoCMS project */
  site: Site;
  /** The ID of the current environment */
  environment: string;
  /** All the models of the current DatoCMS project, indexed by ID */
  itemTypes: Partial<Record<string, ModelBlock>>;
  /** The current DatoCMS user. It can either be the owner or one of the collaborators (regular or SSO). */
  currentUser: User | SsoUser | Account;
  /** The role for the current DatoCMS user */
  currentRole: Role;
  /** The access token to perform API calls on behalf of the current user */
  currentAccessToken: string;
  /** The current plugin */
  plugin: Plugin;
  /** UI preferences of the current user */
  ui: {
    /** Preferred locale */
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
  /** All the fields currently loaded for the current DatoCMS project, indexed by ID. It will always contain the current model fields and all the fields of the blocks it might contain via Modular Content/Structured Text fields. If some fields you need are not present, use the `loadItemTypeFields` function to load them. */
  fields: Partial<Record<string, Field>>;
  /** An object containing the theme colors for the current DatoCMS project */
  theme: Theme;
  /** All the regular users currently loaded for the current DatoCMS project, indexed by ID. It will always contain the current user. If some users you need are not present, use the `loadUsers` function to load them. */
  users: Partial<Record<string, User>>;
  /** All the SSO users currently loaded for the current DatoCMS project, indexed by ID. It will always contain the current user. If some users you need are not present, use the `loadSsoUsers` function to load them. */
  ssoUsers: Partial<Record<string, SsoUser>>;
  /** The project owner */
  account: Account;
};

export type CommonRenderMeta = CommonMeta & CommonRenderMetaAdditions;

export type CommonRenderMethods = {
  /** Sets the height for the iframe */
  setHeight(number: number): void;
  /** Moves the user to another URL internal to the backend */
  navigateTo(path: string): void;
  /** Loads all the fields for a specific model (or block). Fields will be returned and will also be available in the the `fields` property. */
  loadItemTypeFields(itemTypeId: string): Promise<Field[]>;
  /** Loads all regular users. Users will be returned and will also be available in the the `users` property. */
  loadUsers(): Promise<User[]>;
  /** Loads all SSO users. Users will be returned and will also be available in the the `ssoUsers` property. */
  loadSsoUsers(): Promise<SsoUser[]>;
  /** Opens a dialog for creating a new record. It returns a promise resolved with the newly created record or `null` if the user closes the dialog without creating anything. */
  createNewItem(itemTypeId: string): Promise<Item | null>;
  /** Opens a dialog for selecting multiple records from a list of existing records of type `itemTypeId`. It returns a promise resolved with an array of selected records, or `null` if the user closes the dialog without choosing any record. */
  selectItem(
    itemTypeId: string,
    options: {
      multiple: true;
    },
  ): Promise<Item[] | null>;
  /** Opens a dialog for selecting one record from a list of existing records of type `itemTypeId`. It returns a promise resolved with the selected record, or `null` if the user closes the dialog without choosing any record. */
  selectItem(
    itemTypeId: string,
    options?: {
      multiple: false;
    },
  ): Promise<Item | null>;
  /** Opens a dialog for editing an existing record. It returns a promise resolved with the edited record, or `null` if the user closes the dialog without persisting any change. */
  editItem(itemId: string): Promise<Item | null>;
  /** Triggers a UI-consistent alert toast displaying the selected message */
  alert(message: string): void;
  /** Triggers a UI-consistent notice toast displaying the selected message */
  notice(message: string): void;
  /** Triggers a UI-consistent custom toast displaying the selected message (and a CTA) */
  customToast<CtaValue = unknown>(toast: Toast<CtaValue>): Promise<CtaValue | null>;
  /** Opens a dialog for selecting multiple existing assets. It returns a promise resolved with an array of selected assets, or `null` if the user closes the dialog without selecting any upload. */
  selectUpload(options: { multiple: true }): Promise<Upload[] | null>;
  /** Opens a dialog for selecting an existing asset. It returns a promise resolved with the selected asset, or `null` if the user closes the dialog without selecting any upload. */
  selectUpload(options?: { multiple: false }): Promise<Upload | null>;
  /** Opens a dialog for editing a Media Area asset. It returns a promise resolved with:
   *
   * * the updated asset, if the user persists some changes to the asset itself
   * * `null`, if the user closes the dialog without persisting any change
   * * an asset structure with an additional `deleted` property set to true, if the user deletes the asset
   */
  editUpload(uploadId: string): Promise<(Upload & { deleted?: true }) | null>;
  /** Opens a dialog for editing a "single asset" field structure. It returns a promise resolved with the updated structure, or `null` if the user closes the dialog without persisting any change. */
  editUploadMetadata(
    /** The "single asset" field structure */
    fileFieldValue: FileFieldValue,
    /** Shows metadata information for a specific locale */
    locale?: string,
  ): Promise<FileFieldValue | null>;
  /** Opens a custom modal. Returns a promise resolved with what the modal itself returns calling the `resolve()` function */
  openModal(modal: Modal): Promise<unknown>;
  /** Opens a UI-consistent confirmation dialog. Returns a promise resolved with the value of the choice made by the user */
  openConfirm(options: ConfirmOptions): Promise<unknown>;
};

export type CommonRenderItemFormMetaAdditions = {
  /** The currently active locale for the record */
  locale: string;
  /** If an already persisted record is being edited, returns the full record entity */
  item: Item | null;
  /** The model for the record being edited */
  itemType: ModelBlock;
  /** The complete internal form state */
  formValues: Record<string, unknown>;
  /** The current status of the record being edited */
  itemStatus: 'new' | 'draft' | 'updated' | 'published';
  /** Whether the form is currently submitting itself or not */
  isSubmitting: boolean;
  /** Whether the form has some non-persisted changes or not */
  isFormDirty: boolean;
};

export type CommonRenderItemFormMeta = CommonRenderMeta & CommonRenderItemFormMetaAdditions;

export type CommonRenderItemFormMethodsAdditions = {
  /** Hides/shows a specific field in the form */
  toggleField(path: string, show: boolean): void;
  /** Disables/re-enables a specific field in the form */
  disableField(path: string, disable: boolean): void;
  /** Smoothly navigates to a specific field in the form. If the field is localized it will switch language tab and then navigate to the chosen field. */
  scrollToField(path: string, locale?: string): void;
  /** Changes a specific path of the `formValues` object */
  setFieldValue(path: string, value: unknown): void;
  /** Triggers a submit form for current record */
  saveCurrentItem(): Promise<void>;
};

export type CommonRenderItemFormMethods = CommonRenderMethods &
  CommonRenderItemFormMethodsAdditions;

export type RenderSidebarPaneMetaAdditions = {
  mode: 'renderSidebarPane';
  /** The ID of the sidebar pane that needs to be rendered */
  sidebarPaneId: string;
  /** The arbitrary `parameters` of the panel declared in the `itemTypeSidebarPanes` function */
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
  /** The ID of the field extension that needs to be rendered */
  fieldExtensionId: string;
  /** The arbitrary `parameters` of the field extension */
  parameters: Record<string, unknown>;
  /** The placeholder for the field */
  placeholder: string;
  /** Whether the field is currently disabled or not */
  disabled: boolean;
  /** The path in the `formValues` object where to find the current value for the field */
  fieldPath: string;
  /** The field where the field extension is installed to */
  field: Field;
  /** If the field extension is installed in a field of a block, returns the top level Modular Content/Structured Text field containing the block itself */
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
  /** The ID of the modal that needs to be rendered */
  modalId: string;
  /** The arbitrary `parameters` of the modal declared in the `openModal` function */
  parameters: Record<string, unknown>;
};

export type RenderModalMeta = CommonRenderMeta & RenderModalMetaAdditions;

export type RenderModalMethodsAdditions = {
  getSettings(): Promise<RenderModalMeta>;
  /** A function to be called by the plugin to close the modal. The `openModal` call will be resolved with the passed return value */
  resolve(returnValue: unknown): void;
};

export type RenderModalMethods = CommonRenderMethods & RenderModalMethodsAdditions;

export type RenderPageMetaAdditions = {
  mode: 'renderPage';
  /** The ID of the page that needs to be rendered */
  pageId: string;
};

export type RenderPageMeta = CommonRenderMeta & RenderPageMetaAdditions;

export type RenderPageMethodsAdditions = {
  getSettings(): Promise<RenderPageMeta>;
};

export type RenderPageMethods = CommonRenderMethods & RenderPageMethodsAdditions;

export type RenderManualFieldExtensionParametersFormMetaAdditions = {
  mode: 'renderManualFieldExtensionParametersForm';
  /** The ID of the field extension for which we need to render the parameters form */
  fieldExtensionId: string;
  /** The current value of the parameters (you can change the value with the `setParameters` function) */
  parameters: Record<string, unknown>;
  /** The current validation errors for the parameters (you can set them implementing the `validateManualFieldExtensionParameters` function) */
  errors: Record<string, unknown>;
};

export type RenderManualFieldExtensionParametersFormMeta = CommonRenderMeta &
  RenderManualFieldExtensionParametersFormMetaAdditions;

export type RenderManualFieldExtensionParametersFormMethodsAdditions = {
  getSettings(): Promise<RenderManualFieldExtensionParametersFormMeta>;
  /** Sets a new value for the parameters */
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
  /** A function to be called by the plugin to persist some changes to the parameters of the plugin */
  save(params: Record<string, unknown>): Promise<void>;
};

export type RenderPluginParametersFormMethods = CommonRenderMethods &
  RenderPluginParametersFormMethodsAdditions;

export type FieldSetupMetaAdditions = {
  mode: 'init';
  /** The model/block model for the field */
  itemType: ModelBlock;
};

export type FieldSetupMeta = InitMeta & FieldSetupMetaAdditions;
