@extends('layouts.admin')

@section('content')

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="card">
    <div class="card-body p-0">
        <table class="min-w-max w-full table-auto">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">
                        Customer
                    </th>
                    <th class="py-3 px-2 text-center">
                        Order No.
                    </th>
                    <th class="py-3 px-6 text-center">
                        Products
                    </th>
                    <th class="py-3 px-6 text-left">
                        Method
                    </th>
                    <th class="py-3 px-6 text-left">
                        Amount
                    </th>
                    <th class="py-3 px-6 text-center"></th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @if (count($payments) > 0)
                    @foreach ($payments as $payment)
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">
                            {{ $payment["user"]["fullname"] }}
                        </td>
                        <td class="py-3 px-2 text-center">
                            {{ str_pad($payment["order_id"], 4, '0', STR_PAD_LEFT) }}
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex items-center justify-center">
                                @foreach ($payment->order['products'] as $product)
                                    <img class="w-6 h-6 rounded-full  {{$loop->index > 0 ? "-m-1" : ""}} transform hover:scale-125" src="{{ $product['images'][0] }}" alt="{{ $product->name }}" /> 
                                @endforeach
                            </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                             <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none {{ $payment["method"] == "stripe" ? "text-indigo-100 bg-indigo-700" : "text-green-100 bg-blue-900"}} rounded">{{ $payment["method"] == "stripe" ? "Stripe" : "Paypal"}}</span>
                        </td>
                        <td class="py-3 px-6 text-left">
                           £@convert($payment["amount"])
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <a href="/admin/payments/{{ $payment->id }}/view" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </a>
                            </div>
                            {{-- <a class="btn btn-info btn-sm" href="/admin/payments/{{ $payment['id'] }}/edit">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Edit
                            </a>
                            <form style="display:inline" method="POST" action="{{ route('payments.destroy', $payment->id) }}">
                                @method('DELETE')
                                @csrf
                                <button class="btn btn-danger btn-sm" type="submit">
                                    <i class="fas fa-trash">
                                    </i>
                                    Delete
                                </button>
                            </form> --}}
                        </td>
                    </tr>
                    @endforeach
                @else
                <tr class="brequest-b brequest-gray-200 hover:bg-gray-100"><td colspan="6" class="py-3 px-6 text-left">No payments found!</td></tr>
                @endif
            </tbody>
        </table>
        <div class="my-3 mx-3">
            {!! $payments->links() !!}
        </div>
    </div>
    <!-- /.card-body -->
    </div>
    <!-- /.card -->

</section>

<!-- /.content -->
@endsection


