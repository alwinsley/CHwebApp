import React from 'react';
import { withStyles, Button, Card, CardContent, Divider, Typography } from '@material-ui/core';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import classNames from 'classnames';
import StripeCheckout from 'react-stripe-checkout';

const api_host = "http://localhost:8080"

const styles = theme => ({
  header: {
    height: 600,
    background:
      'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
    color: theme.palette.primary.contrastText
  },
  cardHeader: {
    backgroundColor: theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[800])
  }
});


const PricingStyle1Page = ({ classes }) => {

  let headers = new Headers();

  headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');

  let onToken = (token) => {

    console.log(token);
    console.log(token.id);

    let plan = this.getState('plan');
    console.log(plan);

    fetch(api_host + '/stripe/customer/create', {
      method: 'POST',
      body: JSON.stringify({
        token: token.id,
        plan: ""
      }),
      headers: headers
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);
        alert(`We are in business, ${data.email}`);
      });
    });
    
  }

  function onclick(plan){
    this.setState({ plan });
    // this.setState('plan', plan);
    console.log(this.getState('plan'));
  }



  return (
    <div>
      <div className={classNames(classes.header, 'flex')}>
        <div className="p-24 w-full max-w-2xl mx-auto">
          <div className="text-center my-128 mx-24">
            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
              <Typography variant="h2" color="inherit" className="font-light">
                Simple Pricing!
              </Typography>
            </FuseAnimate>

            <FuseAnimate duration={400} delay={600}>
              <Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
                The most advanced customer support tools with a simple and affordable pricing. And you can always try
                for 30 days, free!
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>

      <div className="-mt-192">
        <div className="w-full max-w-2xl mx-auto">
          <FuseAnimateGroup
            enter={{
              animation: 'transition.slideUpBigIn'
            }}
            className="flex items-center justify-center flex-wrap"
          >
            <div className="w-full max-w-320 sm:w-1/3 p-12">
              <Card square>
                <div className={classNames(classes.cardHeader, 'px-24 py-16')}>
                  <Typography variant="subtitle1" color="inherit">
                    BASIC
                  </Typography>
                </div>

                <CardContent className="p-32">
                  <div className="flex justify-center">
                    <Typography variant="h5" color="textSecondary">
                      $
                    </Typography>
                    <div className="flex items-end">
                      <Typography className="text-72 mx-4 font-light leading-none">4</Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        / month
                      </Typography>
                    </div>
                  </div>

                  <Divider className="my-32" />

                  <div className="flex flex-col">
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">10</span>
                      Projects
                    </Typography>
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">10</span>
                      Pages
                    </Typography>
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">100</span>
                      Mb Disk Space
                    </Typography>
                  </div>
                </CardContent>

                <div className="flex justify-center pb-32">
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_zGJEFSWC56G7KJdbApBUR5cG00ZwS89t5y"
                  >
                    <Button variant="contained" color="secondary" className="w-128">
                      BUY NOW
                    </Button>
                  </StripeCheckout>
                </div>
              </Card>
            </div>

            <div className="w-full max-w-320 sm:w-1/3 p-12">
              <Card raised square>
                <div className={classNames(classes.cardHeader, 'flex items-center justify-between px-24 py-16')}>
                  <Typography variant="subtitle1" color="inherit">
                    STANDARD
                  </Typography>
                  {/* <Typography variant="caption" color="inherit">
                    Save 15%
                  </Typography> */}
                </div>

                <CardContent className="p-32">
                  <div className="flex justify-center">
                    <Typography variant="h5" color="textSecondary">
                      $
                    </Typography>
                    <div className="flex items-end">
                      <Typography className="text-72 mx-4 font-light leading-none">8</Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        / month
                      </Typography>
                    </div>
                  </div>

                  <Divider className="my-32" />

                  <div className="flex flex-col">
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">20</span>
                      Projects
                    </Typography>
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">20</span>
                      Pages
                    </Typography>
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">200</span>
                      Mb Disk Space
                    </Typography>
                  </div>
                </CardContent>

                <div className="flex justify-center pb-32">
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_zGJEFSWC56G7KJdbApBUR5cG00ZwS89t5y"
                  >
                    <Button variant="contained" color="secondary" className="w-128">
                      BUY NOW
                    </Button>
                  </StripeCheckout>
                </div>
              </Card>
            </div>

            <div className="w-full max-w-320 sm:w-1/3 p-12">
              <Card square>
                <div className={classNames(classes.cardHeader, 'px-24 py-16')}>
                  <Typography variant="subtitle1" color="inherit">
                    ADVANCED
                  </Typography>
                </div>

                <CardContent className="p-32">
                  <div className="flex justify-center">
                    <Typography variant="h5" color="textSecondary" className="font-medium">
                      $
                    </Typography>
                    <div className="flex items-end">
                      <Typography className="text-72 mx-4 font-light leading-none">12</Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        / month
                      </Typography>
                    </div>
                  </div>

                  <Divider className="my-32" />

                  <div className="flex flex-col">
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">40</span>
                      Projects
                    </Typography>
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">40</span>
                      Pages
                    </Typography>
                    <Typography variant="subtitle1" className="">
                      <span className="font-bold mr-4">500</span>
                      Mb Disk Space
                    </Typography>
                  </div>
                </CardContent>


                <div className="flex justify-center pb-32">
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_zGJEFSWC56G7KJdbApBUR5cG00ZwS89t5y"
                  >
                    <Button variant="contained" color="secondary" className="w-128">
                      BUY NOW
                    </Button>
                  </StripeCheckout>
                </div>
              </Card>
            </div>
          </FuseAnimateGroup>

          <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">
            <Typography variant="h4" className="pb-32 font-light">
              Frequently Asked Questions
            </Typography>

            <div className="flex flex-wrap w-full">
              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">How does free trial work?</Typography>
                <Typography className="text-16" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt
                  accumsan. In dignissim laoreet ipsum eu interdum.
                </Typography>
              </div>

              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">Can I cancel any time?</Typography>
                <Typography className="text-16" color="textSecondary">
                  Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus.
                  Donec maximus ipsum in malesuada hendrerit.
                </Typography>
              </div>

              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">What happens after my trial ended?</Typography>
                <Typography className="text-16" color="textSecondary">
                  Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed quis neque tellus.
                  Donec maximus ipsum in malesuada hendrerit.
                </Typography>
              </div>

              <div className="w-full sm:w-1/2 p-24">
                <Typography className="text-20 mb-8">Can I have a discount?</Typography>
                <Typography className="text-16" color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue tincidunt
                  accumsan. In dignissim laoreet ipsum eu interdum.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(PricingStyle1Page);
