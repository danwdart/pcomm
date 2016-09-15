export default ($) => {
    $(document).ready(() => {
        // Insert things you can't do with Angular here

        $('.messages').height(
            $('body').height() - $('footer').height()
        );

        $('input.select-all[type="checkbox"]').on('change', (ev) => {
            let $this = $(ev.currentTarget);

            $this.parents('table')
                .find('input[type="checkbox"]')
                .prop(
                    'checked',
                    $this.prop('checked')
                );
        })
    });
}
