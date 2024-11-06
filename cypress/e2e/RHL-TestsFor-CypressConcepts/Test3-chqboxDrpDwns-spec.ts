describe('Rahul Shetty- Test to learn Check Boxes drop downs', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    });

    it('Learn Check Boxes ".check" & ".uncheck" Concept', () => {

        cy.get('[id="checkBoxOption1"]').check().should('be.checked').and('have.value', 'option1');
        cy.get('[id="checkBoxOption1"]').uncheck().should('not.be.checked').and('have.value', 'option1');

        cy.get('input[type="checkbox"]').check(['option1', 'option2', 'option3']).should('be.checked');
        cy.get('input[type="checkbox"]').uncheck(['option1', 'option2', 'option3']).should('not.be.checked');
    });


    it('Learn Drop Downs "select" ', () => {
        cy.get('select').select('option2').should('have.value', 'option2');
    });

    it('dynamically Select the DropDown like input box type select the dropdown', () => {
        cy.get('[id="autocomplete"]').type('ind');

        cy.get('li.ui-menu-item div').each(($el) => {
            if ($el.text() === "India") {
                cy.wrap($el).click();
            }
        });
        cy.get('#autocomplete').should('have.value', 'India');
    });


    it('Learn Visibility and Invisiblility objects in Elements', () => {
        cy.get('#name').should('be.visible');

        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');

        cy.get('#show-textbox').contains('Show').click()
        cy.get('#displayed-text').should('be.visible');

        // cy.get('#hide-textbox')
    });




    it('Learn Radio Button Checked or not with value as checked or not', () => {

        cy.get('[value="radio2"]').check().should('be.checked').should('have.value', 'radio2');

    });


    it('Learn Handle the Alerts of "window:alert" & window:confirm in web Apps', () => {
        // cypress are capability of browser events, "window:alerts" is the event which get fired on alert open  //
        // so you firing the event through cypress to get access to the alert //
        cy.get('#alertbtn').click();
        cy.get('#confirmbtn').click();

        cy.on('window:alert', (str) => {
            expect(str).to.eq('Hello , share this practice page and share your knowledge');
        });




        cy.on('window:confirm', (str) => {
            expect(str).to.eq('Hello , Are you sure you want to confirm?');
        });
    });


    it('Learn Handle the Child TAB and Child Window in your Page "cy.origin" & "removeAttr" ', () => {
        // we trying to revese the attribute from jquery i'm trying to remove this "target="_blank""//   
        cy.get('#opentab').click();
        // if above i used another URL opend in separate Tab cypress can not test other tab //

        cy.get('#opentab').invoke('removeAttr', 'target').click();
        // Just remember Cypress can not encourage to run cross domain" if same domain it can work //
        // cy.get('#navbarSupportedContent a[href="about.html"]').contains('About us').click();


        // but still we have option to chose Cross domain it can work if we choes as cy.orign;
        cy.origin('https://www.qaclickacademy.com/', () => {
            // wht ever you want to do with other domain you need to write here only //
            cy.get('#navbarSupportedContent a[href="about.html"]').contains('About us').click();
            cy.contains('Contact').should('be.visible').click();
            cy.get('.mt-30 h2').should('contain', 'Keep in touch');
        });
    });


    it('Learn Handling the web Tables sibling DOM eleming ".next" & "each', () => {
        // :nth-child(2) is here used to find the CSS Element of column// 
        // You can traverse to sibling with next() and it worked only on get //
        cy.get('#product tr td:nth-child(2)').each(($el, $index, $list) => {
            const text = $el.text();
            if (text.includes('Python')) {
                cy.get('tr td:nth-child(2)').eq($index).next().then((price) => {
                    const priceText = price.text();
                    expect(priceText).to.eq('25')
                })
            }
        });

    });


    it('Learn "MouseOver" in cypress with Jquery of "show()"method ', () => {
        // if we used "{ force: true }" cypress used to clcik the invisible elements //
        cy.get('#mousehover').invoke('show');
        cy.contains('Top').click({ force: true });

        cy.url().should('includes', 'top');

    });

});