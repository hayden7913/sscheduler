export const TOGGLE_IS_EDITING = 'TOGGLE_IS_EDITING';
export const toggleIsEditing = (bool) => ({
    type: 'TOGGLE_IS_EDITING',
    isEditingCard: bool,
});
